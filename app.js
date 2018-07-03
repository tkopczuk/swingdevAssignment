const express = require('express');
const mongodb = require('mongodb');
const path = require('path');

const app = express();

const appRouter = require('./appRouter.js');

let MongoClient = require('mongodb').MongoClient;
let db;

MongoClient.connect("mongodb://mo1335_swingdev:SwingDevRec18@mongo16.mydevil.net:27017/mo1335_swingdev", {useNewUrlParser: true}, function(err, database) {
	if(err) throw err;
	
	db = database;
	
	
	app.listen(3000);
	console.log("Listening on port 3000");
});



app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
	req.db = db.db('mo1335_swingdev');
	next();
});

app.use('/', appRouter);