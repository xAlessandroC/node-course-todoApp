const _= require("lodash");
const express = require("express");
const bodyParser = require("body-parser");

const {mongoose} = require("./db/mongoose");
const {Todo} = require("./models/todo");
const {User} = require("./models/user");

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
      return res.status(404).send();
    }

    res.status(200).send(result);

  }).catch((e)=>{res.status(400).send()})
});

app.delete("/todos/:id",(req, res)=>{
  if(!ObjectID.isValid(req.params.id)){
    res.status(404).send();
  }

  Todo.findByIdAndDelete(req.params.id).then((result)=>{
    if(!result){
      return res.status(404).send();
    }

    res.status(200).send({"todo":result});

  }).catch((e)=>{res.status(400).send()})
});

app.patch("/todos/:id",(req,res)=>{
  var id=req.params.id;
  var body=_.pick(req.body,["text","completed"]);

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt=new Date().getTime();
  }else{
    body.completed=false;
    body.completedAt=null;
  }

  if(!ObjectID.isValid(id)){
    res.status(404).send();
  }

  Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((result)=>{
    if(!result){
      return res.status(404).send();
    }

    res.status(200).send({"todo":result});

  }).catch((e)=>{res.status(400).send()})
});

app.listen(port,()=>{
  console.log(`Server started on port ${port}!`);
});

module.exports={app}
