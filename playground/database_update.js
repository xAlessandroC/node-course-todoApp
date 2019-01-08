const {MongoClient, ObjectID}=require("mongodb");

//var id=new ObjectID();
//console.log(id);

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err,client)=>{
  if(err){
    return console.log("Unable to connect database",err);
  }

  console.log("Connected to MongoDB server!");
  const db=client.db("TodoApp");

  // db.collection("Todos").findOneAndUpdate({
  //     _id: new ObjectID("5c34fd7901edd6c7fd7f1886")
  // },{
  //   $set:{
  //     completed: true
  //   }
  // },{
  //   returnOriginal:false
  // }).then((results)=>{
  //   console.log(results);
  // });

  /*CHALLENGE*/
  db.collection("Users").findOneAndUpdate({
      _id: new ObjectID("5c33b1f735b358d3c86b8a48")
  },{
    $set:{
      name: "Alessandro"
    },
    $inc:{
      age:1
    }
  },{
    returnOriginal:false
  }).then((results)=>{
    console.log(results);
  });

  client.close();
});
