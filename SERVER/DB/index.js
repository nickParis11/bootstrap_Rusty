var mysql=require('mysql')
var config=require('./../../CONFIG/config')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : config.pwd,
  database : 'bootStrapRusty'
});


console.log('config  = ',config);
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});
 
exports.retrieveUsers = function (req,res,cb) {

	connection.query('SELECT * FROM dogowner', function (error, results, fields) {
		console.log('in db query GET ')
	  if (error) {
	  	cb(error,null)
	  	console.log('error in db index GET ', error);
	  } else {
	  	cb(null,results)
	  	console.log('The solution is: ', results);
	  }
	});

}

exports.addUser = function (req,res,cb) {

	console.log('in addUser ()');


	var sql="INSERT INTO dogowner (email,name,zip,password,pet,prod) VALUES ('"+req.body.email+"','"+req.body.name+"','"+req.body.zip+"','"+req.body.password+"','"+req.body.pet+"',true)";

	connection.query(sql, function (error, results, fields) {
			console.log('in db query POST ')
		  if (error) {
		  	cb(error,null)
		  	console.log('error in db index POST ', error);
		  } else {
		  	console.log('in db index, inserted : ', results);
		  	cb(null,results)
		  	
		  }
	});
}


exports.connection = connection;