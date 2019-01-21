const {ObjectID} = require("mongodb");

const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user");

var id="4c3b8sce3b4dab20a8c4db84";

// if(!ObjectID.isValid(id)){
//   console.log("ID not valid!");
// }
//differenti modi per trovare una entry grazie al suo id

// Todo.find({
//   _id:id
// }).then((result)=>{
//   console.log("Find:",result);
// });
//
// Todo.findOne({
//   _id:id
// }).then((result)=>{
//   console.log("FindOne:", result);
// });

// Todo.findById(id).then((result)=>{
//   if(!result){
//     return console.log("ID not found!");
//   }
//   console.log("FindById:", result);
// }).catch((e)=>console.log(e));

/*CHALLENGE*/
User.findById(id).then((result)=>{
   if(!result){
     return console.log("User not found!");
   }
   console.log("FindById:", result);
 }).catch((e)=>console.log(e));
