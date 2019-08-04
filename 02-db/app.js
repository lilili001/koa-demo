/**
 * Created by miyaye on 2019/8/4.
 */
var MongoClient = require('mongodb').MongoClient
    // , assert = require('assert');


// Connection URL
var url = 'mongodb://localhost:27017/koa';

// Use connect method to connect to the server
MongoClient.connect(url,{useNewUrlParser:true}, function(err, db) {
    //assert.equal(null, err);
    console.log("Connected successfully to server");
    const collection = db.collection('user');

    //查 查询所有数据
    const result = collection.find({});
    result.toArray((err,docs)=>{
        console.log(docs);
    });

    //增
    collection.insertOne({'username':'joe',age:'12',sex:'woman',status:1},function (err,res) {//成功后回调
        if(!err){
            console.log('增加成功')
        }
    });



    db.close();
});