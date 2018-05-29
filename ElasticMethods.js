var elasticsearch=require('elasticsearch');

var client;

/*This method will return the object of elastic search.
you can replace this url to cloud url also.
You can also pass an array of url.
 */
function getElasticObject(){
     client = new elasticsearch.Client( {  
        hosts: [
          'http://localhost:9200' //your local clusture url or cloud url. you can also add array of url
        ]
      });
      return client;
      
}

/**
 * this will check whether you are connected to elastic server or not.
 */
function  checkClustureHealth(elasticObject){
    //Testing elastic cloud clusture health
    elasticObject.cluster.health({},function(err,resp,status) {  
        console.log("-- Client Health --",resp);
    });
    
}

/**
 * this will create and index clusture on elastic server.
 */
function createClusture(elasticObject, indexName){
    elasticObject.indices.create({  
        index: indexName
      },function(err,resp,status) {
        if(err) {
          console.log(err);
        }
        else {
          console.log("-- create",resp);
        }
      });
}

/**
 * using this you can delete index
 */
function deleteIndex(elasticObject, indexName){
    elasticObject.indices.delete({index: indexName},function(err,resp,status) {  
        console.log("-- deleted",resp);
      });
}

//You can specify id field. If you do not specify it, elastic search will add one random id
//itself. So let elastic server take care of it. i am commenting it here. you can uncomment it
// if you want a custom id format.
// as output we are printing output from elastic server.
// id is good if you want to avoid duplicate data insert. for example: if you set id equals to 1
// first time data will be indexed but if you again try to index your data then it will not allow
// you to do so.
function createIndex(clientObject, indexName, typeName, documentBody){
    clientObject.index({  
        index: indexName,
       // id: '1',
        type: typeName,
        body: documentBody
      },function(err,resp,status) {
          console.log(resp);
      });
}

/**delete document from elastic server */
function deleteDocument(clientObject, indexName, typeName, id){

    clientObject.delete({  
        index: indexName,
        id: id,
        type: typeName
      },function(err,resp,status) {
          console.log(resp);
      });
}

/**get the total count of documents */
function getDocumentCount(clientObject, indexName, typeName){
    clientObject.count({index: indexName,type: typeName}
        ,function(err,resp,status) {  
        console.log("total count: ",resp);
      });
}


/** 
 * here we are searching all the index where empname is Martand Singh.
 * this is the basic index searching. Elastic search has a huge collection of
 * queries. As this tutorial is just to show you how to connect and perform
 * operation with node js & elastic search, So we will not go to very deep in elastic search.
 * 
*/
function searchIndex(clientObject, indexName, typeName){
    
    clientObject.search({  
    index: indexName,
    type: typeName,
    body: {
      query: {
        match: { "empname": "Martand" }
      },
    }
  },function (error, response,status) {
      if (error){
        console.log("search error: "+error)
      }
      else {
        console.log("--- Response ---");
        console.log(response);
        console.log("--- Hits ---");
        response.hits.hits.forEach(function(hit){
          console.log(hit);
        })
      }
  });
}

module.exports.getElasticObject = getElasticObject;
module.exports.checkClustureHealth = checkClustureHealth;  
module.exports.createClusture = createClusture;
module.exports.deleteIndex = deleteIndex;
module.exports.createIndex = createIndex;
module.exports.bulkInsert = bulkInsert;
module.exports.deleteDocument = deleteDocument;
module.exports.getDocumentCount = getDocumentCount;
module.exports.searchIndex = searchIndex;