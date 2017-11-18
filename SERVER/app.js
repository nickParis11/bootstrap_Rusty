var express=require('express');
var bodyParser=require('body-parser')

var db=require('./DB/index')

var app= express();

app.use(bodyParser());

process.storage=[];

app.use(express.static(__dirname+'./../PUBLIC'))
//app.use(express.static(__dirname + '/../client/dist'));

app.get('/api/dogowner',function(req,res){

	db.retrieveUsers(req,res,function(err,data){

		if (err) {
			console.log('error in app.get cb',err)
			return;
		} 

		var response=data.map(dogOwner=>{
			var profile={};
			profile.email=dogOwner.email;
			profile.name=dogOwner.name;
			profile.zip=dogOwner.zip;
			profile.password=dogOwner.password;
			profile.pet=dogOwner.pet;
			return profile;
		})

		res.send(response)
	})
})

app.post('/api/dogowner/signup',function(req,res){
	console.log('just got a post request, req = ',req.body)

	db.addUser(req,res,function(err,data){
		if (err) {
			console.log('error in app.post! cb',err)
			res.send('booo baaaa ugly error')
		} else {
			res.send(data)
		}

	})

	//var body=JSON.parse(req.body);
	//process.storage.push(req.body);
	//console.log('server storage  = ',process.storage);
	//res.send(process.storage[process.storage.length-1])
})

const port=5000;

//curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -X POST http://localhost:3000/data

app.listen(port,function(){
	console.log('server running on port ',port);
})