const {MongoClient, ObjectID}=require("mongodb");

//var id=new ObjectID();
//console.log(id);

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err,client)=>{
  if(err){
    return console.log("Unable to connect database",err);
  }

  console.log("Connected to MongoDB server!");
  const db=client.db("TodoApp");

  // db.collection("Todos").deleteMany({text:"Eat lunch"}).then((results)=>{
  //   console.log(results);
  // });

  // db.collection("Todos").deleteOne({text:"Eat lunch"}).then((results)=>{
  //   console.log(results);
  // });

  // db.collection("Todos").findOneAndDelete({completed: false}).then((results)=>{
  //   console.log(results);
  // });

  /*CHALLENGE*/
  // db.collection("Users").deleteMany({name: "Alessandro"}).then((results)=>{
  //   console.log(results);
  // });

  db.collection("Users").findOneAndDelete({_id: new ObjectID("5c33b20135b358d3c86b8a4a")}).then((results)=>{
    console.log(results);
  });

  client.close();
});
