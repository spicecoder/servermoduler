const Express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = 'mongodb://localhost:27017/';
const DATABASE_NAME = "fruit_app_db";
const COLLECTION_NAME ="fruits";
const PORT = 8080;

const app = Express();
app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

// app.listen(PORT, ()=>{
//     console.log(`Server is running on port: ${PORT}`);
// });

var database, collection; 

//----------------Connect to DB--------------------------
 
app.listen(PORT, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection(COLLECTION_NAME);
        console.log(`Server is running on port: ${PORT}`);
        console.log(`Connected to DB: ${DATABASE_NAME} collection: ${COLLECTION_NAME} `);
    });
});

//----------------------------------------------------------

//-----------------------API calls--------------------------

app.post("/fruit", (request, response) => {
    collection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.get("/fruit/:id", (request, response) => {
    collection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});
	
 app.get("/fruits", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.put("/fruit/:id", (request, response)=> {
  if (!request.body) {
    return response.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = request.params.id;
  var objectId = new ObjectId(id);
  collection.replaceOne({_id:objectId}, request.body)
    .then(data => {
      if (!data) {
        response.status(404).send({
          message: `Cannot update fruit with id=${id}. Maybe fruit was not found!`
        });
      } else response.send({ message: "Fruit was updated successfully, no of recs:" + data.result.nModified});
    })
    .catch(err => {
      response.status(500).send({
        message: "Error updating fruit with id=" + id
      });
    });
});

app.delete("/fruit/:id", (request, response)=> {
    const id = request.params.id;
  
    collection.deleteOne( { "_id" : ObjectId(id) } )
      .then(data => {
        if (!data) {
          response.status(404).send({
            message: `Cannot delete fruit with id=${id}. Maybe fruit was not found!`
          });
        } else { 
          response.send({
            message: "Fruit was deleted successfully! deleted:" + data.result.n
          });
        }
      })
      .catch(err => {
        response.status(500).send({
          message: "Could not delete fruit with id=" + id
        });
      });
  });

 