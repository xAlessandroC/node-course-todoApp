const {MongoClient, ObjectID}=require("mongodb");

//var id=new ObjectID();
//console.log(id);

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err,client)=>{
  if(err){
    return console.log("Unable to connect database",err);
  }

  console.log("Connected to MongoDB server!");
  const db=client.db("TodoApp");

  // db.collection("Todos").insertOne({
  //   text:"Something to do",
  //   completed:false
  // },(err,result)=>{
  //   if(err){
  //     return console.log("Unable to insert a new data!", err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops,undefined,2));
  // });

  db.collection("Users").insertOne({
    name:"Alessandro",
    age:21,
    location:"Bologna"
  },(err,result)=>{
    if(err){
      return console.log("Unable to insert a new data!", err);
    }

    console.log(JSON.stringify(result.ops,undefined,2));
  });

  client.close();
});
