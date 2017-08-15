var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('itemsDatabase', ['items', 'test']);


var server = require('http').createServer(app);

server.listen(3001, function() {
	console.log("Express server started!")
});


app.get('/items', function(request, res) {
	db.items.find(function(err, docs) {
		//console.log(docs);
		res.json(docs);
	});
});

app.get('/items/:id', function(req, res) {
	var id = req.params.id;
	db.items.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});

app.get('/items/insert/:name/:age', function(req,res) {
	db.items.insert({name: req.params.name, age: req.params.age}, function(req, doc) {
		res.json(doc);
	});
});



