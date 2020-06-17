var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/employees');
var Employee = mongoose.model('Employee', mongoose.Schema({
	name:String,
	attendance:Number,
	reliability:Number,
	initiative:Number,
	judgement:Number,
	cooperation:Number,
	email:String,
	average:{ type: Number, default: 0 }
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

app.get('/api/employees', function(req, res){
	Employee.find(function(err, employees){
		if(err)
			res.send(err);
		res.json(employees);
	});
});

app.get('/api/employees/:id', function(req, res){
	Employee.findOne({_id:req.params.id}, function(err, employee){
		if(err)
			res.send(err);
		res.json(employee);
	});
});
app.post('/api/employees', function(req, res){
	var values = {
		name:req.body.name,
		attendance:req.body.attendance,
		reliability:req.body.reliability,
		initiative:req.body.initiative,
		judgement:req.body.judgement,
		cooperation:req.body.cooperation,
		email:req.body.email,
		average:(req.body.cooperation+req.body.attendance+req.body.reliability+req.body.initiative+req.body.judgement)/5
	}
	Employee.create( values, function(err, employees){
		if(err)
			res.send(err);
		
		res.json(employees);
	});

});

app.delete('/api/employees/:id', function(req, res){
	Employee.findOneAndRemove({_id:req.params.id}, function(err, employee){
		if(err)
			res.send(err);
		res.json(employee);
	});
});
app.put('/api/employees/:id', function(req, res){
	var query = {
		name:req.body.name,
		attendance:req.body.attendance,
		reliability:req.body.reliability,
		initiative:req.body.initiative,
		judgement:req.body.judgement,
		cooperation:req.body.cooperation,
		email:req.body.email,
		average:(req.body.cooperation+req.body.attendance+req.body.reliability+req.body.initiative+req.body.judgement)/5
	};
	Employee.findOneAndUpdate({_id:req.params.id}, query, function(err, employee){
		if(err)
			res.send(err);
		res.json(employee);
	});
});
app.listen(3000, function(){
	console.log('server is running on port 3000..');
});