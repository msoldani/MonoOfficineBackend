var express = require('express');
var app = express();
var session = require('express-session')
const cors = require('cors')
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient;





app.use(cors());
app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.get('/', function (req, res) {
    res.render("login");
});

app.get('/login/:login/:pass', function (req, res) {
      MongoClient.connect('mongodb+srv://admin:wenandrea123@andreawen-jytg8.mongodb.net/test?retryWrites=true,{useNewUrlParser: true}', function(err, db) {
      if (err) {
        throw err;
      }
      var dbo = db.db("Tecnologie");
      dbo.collection("Users").findOne({username: req.params.login, password: req.params.pass}, function(err, result) {
        if (err) {
          throw err;
        }
        if(result){
            var x = result.username;
            var y = result.password;
            console.log("Accesso eseguito da: " + x);
            console.log("username: " + x);
            console.log("password: " + y);
            res.send({result:result})
            session.log=true;
        }else{
            res.send({result:"Errore"})
        }
        db.close();
      })
    });
});





app.post('/registrazione', function (req, res) {
            MongoClient.connect('mongodb+srv://admin:wenandrea123@andreawen-jytg8.mongodb.net/test?retryWrites=true,{useNewUrlParser: true}', function(err, db) {
              if (err) {throw err;}
              var dbo = db.db("Tecnologie");
              var newRist = {username: req.body.login, password: req.body.pass };
              dbo.collection("Users").insertOne(newRist, function(err, result) {
                if (err) throw err;
                if (result.result.n == 1){
                    res.send({result:result})
                    var x = result.username;
                    var y = result.password;
                    console.log("username: " + x);
                    console.log("password: " + y);
                }
                else{res.send({result:"Errore"})}
                db.close();
              });    
    });  
});


app.post('/noleggio', function (req, res) {
            MongoClient.connect('mongodb+srv://admin:wenandrea123@andreawen-jytg8.mongodb.net/test?retryWrites=true,{useNewUrlParser: true}', function(err, db) {
              if (err) {throw err;}
              var dbo = db.db("Tecnologie");
              var newRist = {dataIn: req.body.dataInizio, oraIn: req.body.oraInizio , dataFi:req.body.dataFine, oraFi:req.body.oraFine};
              dbo.collection("Monopattini").insertOne(newRist, function(err, result) {
                if (err) throw err;
                if (result.result.n == 1){
                    res.send({result:result})
                }
                else{res.send({result:"Errore"})}
                db.close();
              });    
    });  
});



app.get('/coordinate', function (req, res) {
      MongoClient.connect('mongodb+srv://admin:wenandrea123@andreawen-jytg8.mongodb.net/test?retryWrites=true,{useNewUrlParser: true}', function(err, db) {
      if (err) {throw err;}
      var dbo = db.db("Tecnologie");
      dbo.collection("Monopattini").find().toArray(function(err, result) {
        if (err) {throw err;}
        if(result){
            console.log(result);
            res.send(result)
        }else{res.send({result:"Errore"})}
        db.close();
      })
    });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});