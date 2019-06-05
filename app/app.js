var express = require('express');
var app = express();
const cors = require('cors')
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient;

app.use(cors());
app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.render("login");
});

app.get('/login/:username/:password', function (req, res) {
      MongoClient.connect('mongodb+srv://root:xxx123@soldanimirco-tpwn0.mongodb.net/test?retryWrites=true&w=majority', function(err, db) {
      if (err) {
        throw err;
      }
      var dbo = db.db("MonoOfficine");
      dbo.collection("Utenti").findOne({username: req.params.username, password: req.params.password}, function(err, result) {
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

        }else{
            res.send("Errore");
        }
        db.close();
      })
    });
});

app.post('/registrazione', function (req, res) {
            MongoClient.connect('mongodb+srv://root:xxx123@soldanimirco-tpwn0.mongodb.net/test?retryWrites=true&w=majority', function(err, db) {
              if (err) {throw err;}
              var dbo = db.db("MonoOfficine");
              var newRist = {username: req.body.username, password: req.body.password};
              console.log(req.body.username + req.body.password);
              dbo.collection("Utenti").insertOne(newRist, function(err, result) {
                if (err) throw err;
                if (result.result.n == 1){
                    res.send({result:result})
                    var x = result.username;
                    var y = result.password;
                    console.log("username: " + x);
                    console.log("password: " + y);
                }
                else{res.send("Errore")}
                db.close();
              });
    });
});

app.get('/coordinate', function (req, res) {
      MongoClient.connect('mongodb+srv://root:xxx123@soldanimirco-tpwn0.mongodb.net/test?retryWrites=true&w=majority', function(err, db) {
      if (err) {throw err;}
      var dbo = db.db("MonoOfficine");
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


app.post('/noleggio', function (req, res) {
    MongoClient.connect('mongodb+srv://root:xxx123@soldanimirco-tpwn0.mongodb.net/test?retryWrites=true&w=majority', function(err, db) {
        if (err) {throw err;}
            var dbo = db.db("MonoOfficine");
            var newRist = {username:req.body.User, dataInizio: req.body.dataIn, oraInizio: req.body.oraIn , dataFine:req.body.dataFi, oraFine:req.body.oraFi};
            console.log(newRist);
            dbo.collection("Noleggio").insertOne(newRist, function(err, result) {
                if (err) throw err;
                db.close();
            });
    });
});

app.post('/guasto', function (req, res) {
    MongoClient.connect('mongodb+srv://root:xxx123@soldanimirco-tpwn0.mongodb.net/test?retryWrites=true&w=majority', function(err, db) {
        if (err) {throw err;}
            var dbo = db.db("MonoOfficine");
            var newRist = {idMonopattino:req.body.idMonopattino, problema: req.body.problema, idUser: req.body.idUser , DataSegn:req.body.DataSegn, OraSegn:req.body.OraSegn};
            console.log(newRist);
            dbo.collection("Guasti").insertOne(newRist, function(err, result) {
                if (err) throw err;
                db.close();
            });
    });
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});