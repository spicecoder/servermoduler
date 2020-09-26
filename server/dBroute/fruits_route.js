//const express = require('express')
var  router ;
//= express.Router()
const COLLECTION_NAME  = "fruits";
var collection =  ""


const  setCollection = (db) =>{collection = db.collection(COLLECTION_NAME);}
 //const  routeme = (router)=> {
//setCollection(coll);
const  setRouter = (router) =>{ 
router.route('/:username/:id')
    .get((req,res)=>{
        validateID(req.params.id);
    res.send(' welcome to page, ' + req.params.username)
})
    .post((req,res)=>{
    processData(req.params.username);
    res.send('data received ')
})


    router.route('/fruit').post( (request, response) => {
        collection.insert(request.body, (error, result) => {
            if(error) {
                return response.status(500).send(error);
            }
            response.send(result);
        });
    });
    

router.route("/fruit/:id").get(( request, response) => {
    collection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});
	
 router.route("/fruits").get( (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

router.route("/fruit/:id").put((request, response)=> {
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

router.route("/fruit/:id").delete ((request, response)=> {
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
  return router ;
 }
  
exports.setRouter  = setRouter
exports.routeme = router;
exports.setCollection = setCollection
  
