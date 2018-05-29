var client = require('./ElasticMethods');

var _elasticClient = client.getElasticObject();

/**All functions are commented as we dont want you to perform all the query at once. 
 * just go through them one by one. uncomment the desired function and do some experiment
 * with your custom input, and let us know if you found any bug or anything which i have
 * not mentioned here.
 * Author : Martand Singh
 * 
 * Date : 29 May 2018
 * 
 * Scope : This tutorial will help you to understand how elastic search works with elastic search.
 * Elastic search is a wonderfull tool for indexing your data for the fast operation in your
 * application. Hope you will like this tutorial
 * 
 * Why this tutorials : As a developer i found it very hard to understand elastic search 
 * operations as there was no simpler tutorials available. So trying to provide you a  simpler
 * solutions.
 * 
 * ############ HAPPY INDEXING, Motivate me for the new tutorials ##############
 * 
 * Email : martandsays@gmail.com 
 */


//you can check your console for the elastic object structure.
//console.log(_elasticClient); 

//this will print the clusture information
//client.checkClustureHealth(_elasticClient);

//creating a index. keep index name in lower case. otherwise you will get an error
//client.createClusture(_elasticClient,'employee');

//Deleting an index
//client.deleteIndex(_elasticClient, 'employee');

var documentData ={
    "empcode": "13737",
    "empname": "Martand Singh",
    "dept": "Tech",
    "designation": "Full Stack Developer",
  }

  var documentDataNew ={
    "empcode": "12445",
    "empname": "Suman Singh",
    "dept": "Network",
    "designation": "Network Architect",
  }

   var documentDataNew1 = {
    "empcode": "45344",
    "empname": "Ritu Singh",
    "dept": "Accounts",
    "designation": "Chartered Accountant",
  }

  //single document insert
  //client.createIndex(_elasticClient, 'employee', 'permanent', documentData);

  //multiple document insert


// here we can see it will perform bulk operation to index. We can insert, update & delete
// at one go also. in following example we inserted the data at first step with id 23 
// then we update its dept to Network administrator on the basis of its id.
// At last we delete the index with id 33

//   _elasticClient.bulk({
//     body: [
//       // action description
//       { index:  { _index: 'employee', _type: 'permanent', _id: 23 } },
//        documentDataNew,

//       // action description
//       { update: { _index: 'employee', _type: 'permanent', _id: 23 } },

//        { doc: { dept: 'Network Administrator' } },

//       { delete: { _index: 'employee', _type: 'permanent', _id: 33 } },
//       // no document needed for this delete
//     ]
//   }, function (err, resp) {
//       if(resp.errors) {
//          console.log(JSON.stringify(resp, null, '\t'));
//       }
//   });

//client.deleteDocument(_elasticClient, 'employee', 'permanent', 23);

//client.getDocumentCount(_elasticClient, 'employee', 'permanent')

client.searchIndex(_elasticClient, 'employee', 'permanent')