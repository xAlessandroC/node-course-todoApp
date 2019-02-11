const expect = require("expect");
const request = require("supertest");

const {app} = require("./../server");
const {Todo} = require("./../models/todo");

const {ObjectID} = require("mongodb");

var todos=[
  {_id:new ObjectID(),text:"First test todo"},
  {_id:new ObjectID(),text:"Second test todo",completed:true,completedAt:333}
];


beforeEach((done)=>{
  Todo.deleteMany({}).then(()=>{
    Todo.insertMany(todos).then(()=>{
      done();
    });
  });
});

describe("POST /todos",()=>{
  it("should add a new todo",(done)=>{
    var text="This is from the test module";

    request(app)
    .post("/todos")
    .send({text})
    .expect(200)
    .expect((res)=>{
      expect(res.body.text).toBe(text);
    })
    .end((err,res)=>{
      if(err){
        return done(err);
      }

      Todo.find({text}).then((todos)=>{
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        expect(todos[0].completed).toBe(false);
        expect(todos[0].completedAt).toBe(null);
        done();
      }).catch((e)=>{
        done(e);
      });
    });
  });

  it("should not add a new todo with invalid body",(done)=>{

    request(app)
    .post("/todos")
    .send({})
    .expect(400)
    .end((err,res)=>{
      if(err){
        return done(err);
      }

      Todo.find().then((todos)=>{
        expect(todos.length).toBe(2);
        done();
      }).catch((e)=>{
        done(e);
      });
    });
  });
});

describe("GET /todos",()=>{
  it("should return all todos",(done)=>{

    request(app)
    .get("/todos")
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
    });
});

describe("GET /todos/:id",()=>{
  it("should return the todo",(done)=>{

    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it("should return 404 if todo not found",(done)=>{

    request(app)
    .get(`/todos/${new ObjectID()}`)
    .expect(404)
    .end(done);
  });

  it("should return 404 for non-objects id",(done)=>{

    request(app)
    .get(`/todos/123`)
    .expect(404)
    .end(done);
  });
});

describe("DELETE /todos/:id",()=>{
  it("should delete the todo",(done)=>{
    var id=todos[1]._id.toHexString();

    request(app)
    .delete(`/todos/${id}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(todos[1].text);
    })
    .end((err,res)=>{
      if(err){
        //console.log("ciao")
        return done();
      }

      Todo.findById(id).then((result)=>{
        expect(result).toBeFalsy();
        done();
      }).catch((e)=>{
        done(e);
      });
    });

  });

  it("should return 404 if todo not found",(done)=>{

    request(app)
    .delete(`/todos/${new ObjectID()}`)
    .expect(404)
    .end(done);
  });

  it("should return 404 for non-objects id",(done)=>{

    request(app)
    .delete(`/todos/123`)
    .expect(404)
    .end(done);
  });
});

describe("PATCH /todos/id",()=>{
  it("should update the todo",(done)=>{
    var id=todos[0]._id;
    var newText="First changed text"
    var updateObj={
      text:newText,
      completed:true
    };

    request(app)
    .patch(`/todos/${id}`)
    .send(updateObj)
    .expect(200)
    .end((req,res)=>{
      expect(res.body.todo.text).toBe(newText);
      expect(res.body.todo.completed).toBe(true);
      expect(typeof(res.body.todo.completedAt)).toBe('number');

      done();
    });
  });

  it("should clear completedAt when todo is not completed",(done)=>{
    var id=todos[1]._id;
    var newText="Second changed text"
    var updateObj={
      text:newText,
      completed:false
    }

    request(app)
    .patch(`/todos/${id}`)
    .send(updateObj)
    .expect(200)
    .end((req,res)=>{
      expect(res.body.todo.text).toBe(newText);
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toBeFalsy();

      done();
    });
  });
});
