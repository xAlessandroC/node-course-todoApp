var express = require("express");
var bodyParser = require("body-parser");

var {mongoose} = require("./db/mongoose");
var {Todo} = require("./models/todo");
var {User} = require("./models/user");

const {ObjectID} = require("mongodb");

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

app.post("/todos",(req,res)=>{
  var todo=new Todo({
    text:req.body.text
  });

  todo.save().then((doc)=>{
    // console.log(doc);
    res.send(doc);
  }).catch((e)=>{
    res.status(400).send(e);
  });
});

app.get("/todos",(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  }).catch((e)=>{
    res.status(400).send(e);
  });
});

app.get("/todos/:id",(req, res)=>{
  if(!ObjectID.isValid(req.params.id)){
    res.status(404).send();
  }

  Todo.findById(req.params.id).then((result)=>{
    if(!result){
      res.status(404).send();
    }

    res.status(200).send(result);

  }).catch((e)=>res.status(400).send())
});


app.listen(port,()=>{
  console.log(`Server started on port ${port}!`);
});

module.exports={app}
