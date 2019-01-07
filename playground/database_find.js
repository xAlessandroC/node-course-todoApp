const {MongoClient, ObjectID}=require("mongodb");

//var id=new ObjectID();
//console.log(id);

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err,client)=>{
  if(err){
    return console.log("Unable to connect database",err);
  }

  console.log("Connected to MongoDB server!");
  const db=client.db("TodoApp");


  // db.collection("Todos").find().toArray().then((docs)=>{
  //   console.log("Todos documents:");
  //   console.log(JSON.stringify(docs,undefined,2));
  // },(err)=>{
  //   console.log("Unable to fetch Todos",err);
  // });

  db.collection("Users").find({name:"Alessandro"}).count().then((num)=>{
    console.log(`Users Alessandro count: ${num}`);
  },(err)=>{
    console.log("Unable to fetch Users",err);
  });

  db.collection("Users").find({name:"Alessandro"}).toArray().then((docs)=>{
    console.log("Users documents:");
    console.log(JSON.stringify(docs,undefined,2));
  },(err)=>{
    console.log("Unable to fetch Users",err);
  });

  client.close();
});
