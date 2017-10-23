// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('reviewking.db');
 
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());
 
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
 
app.use(express.static(__dirname + '/public'));
var server_port = process.env.PORT || 8080;


app.get('/',function(req,res){

    console.log('hello from server');
    res.sendFile('index.html');
});

app.get('/pruebaq',function(req,res){
    
        console.log('hello from server');
        res.sendFile('index.html');
    });


// Routes
 
    // Get reviews
     app.get('/pruebaz', function(req, res) {
	     var reviews = [{'title':'Daniel uribe'}];
	     res.json(reviews);
    });

	 app.get('/api/reviews', function(req, res) {
 
        console.log("cargando..");
 		var reviews = [{'title':'Daniel uribe'}];

		 var sql = 'SELECT * FROM review ORDER BY title';

		  db.all(sql, [], (err, rows) => {
            if (err) {
			    throw err;
              }
              reviews = rows;
              res.json(reviews);
        });
         res.json(reviews);
    });
 
    // create review and send back all reviews after creation
     //app.post('/api/reviews', function(req, res) {
 
    //     console.log("creating review");
    //     let sql = 'INSERT INTO review(title,description,rating) VALUES(?,?,?)';

    //     db.run(sql, [req.body.title,req.body.description,req.body.rating], function(err) {
    //         if (err) {
    //           return console.log(err.message);
    //         }
    //         // get the last insert id
    //         console.log(`A row has been inserted with rowid ${this.lastID}`);
    //         res.json(req.body);
    //       });
    // });
 
    // // delete a review
    // app.delete('/api/reviews/:review_id', function(req, res) {
    //     let sql = 'DELETE FROM review WHERE id=?';
    //     console.log(req.params.review_id);
    //     db.run(sql, req.params.review_id, function(err) {
    //         if (err) {
    //           return console.error(err.message);
    //         }
    //         console.log(`Row(s) deleted ${this.changes}`);
    //       });
    //     res.json(req.params.review_id);
    // });
 
 
// listen (start app with node server.js) ======================================
// app.listen(server_port,function(){
//     console.log("App listening on port 8080");
// });
app.listen(8080);
console.log("App listening on port 8080");
