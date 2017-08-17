//hämtar express modulen
var express = require('express');
//Executar express och sätter det till var app
var app = express();
//hämtar mongojs modulen
var mongojs = require('mongojs');
//Executar mongojs och ställer in min collection inställningar
var db = mongojs('itemsDatabase', ['items', 'test']);

//startar en http server på port 3001
var server = require('http').createServer(app);
//Lyssnar efter requests på port 3001
server.listen(3001, function() {
	console.log("Express server started!")
});

/* Get request på /items retunerar alla items i databasen */
app.get('/items', function(request, res) {
	db.items.find(function(err, docs) {
		//console.log(docs);
		res.json(docs);
	});
});
/*GET request på /items/:id så tar vi parametern id och 
söker efter 1 dokument som har samma objectid som vår parameter och sen retunerar det. */
app.get('/items/:id', function(req, res) {
	var id = req.params.id;
	db.items.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});
/*Här så har vi flera parametrar, name och age. Dessa parametrar med följer in i databasen och sparas. Tex:
http://localhost:3001/items/insert/jakob/21 */
app.get('/items/insert/:name/:age', function(req,res) {
	db.items.insert({name: req.params.name, age: req.params.age}, function(req, doc) {
		res.json(doc);
	});
});



