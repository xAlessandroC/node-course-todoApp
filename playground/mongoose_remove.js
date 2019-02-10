const {ObjectID} = require("mongodb");

const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user");

Todo.deleteMany({}).then((result)=>{
  console.log(result);
});

Todo.findOneAndDelete({_id:"5c6000d4359c9ccce272deb0"}).then((result)=>{
  console.log(result);
});

Todo.findByIdAndDelete("5c6000d4359c9ccce272deb0").then((result)=>{
  console.log(result);
});
