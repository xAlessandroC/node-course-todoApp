const expect = require("expect");
const request = require("supertest");

const {app} = require("./../server");
const {Todo} = require("./../models/todo");


beforeEach((done)=>{
  Todo.deleteMany({}).then(()=>{
    done();
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

      Todo.find().then((todos)=>{
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
        expect(todos.length).toBe(0);
        done();
      }).catch((e)=>{
        done(e);
      });
    });
  });
});
