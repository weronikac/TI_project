const express = require('express');
const bodyParser= require('body-parser')
const mongodb = require('mongodb')
var db
const dbname = '8ciurej';
const url = 'mongodb://8ciurej:pass8ciurej@172.20.44.25/8ciurej';


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(require("express-session")({secret: "top secret", resave: false, saveUninitialized: false})); 
app.use(express.static(__dirname + '/public'))


mongodb.MongoClient.connect(url, function(err, client) {
  if (err) return console.log(err)
  db = client.db(dbname);
  console.log('Connect OK');
})
  
app.listen(3013,function() {
   console.log('listening on 3013')
})


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/main.html')
  }) 

app.post('/register', function( req,res ) {
    var email = req.body.email;
    var password = req.body.password;
    db.collection('users').insertOne({email :email, password: password},function(err,result) {
      if (err) return console.log(err)
      console.log('Pomyślna rejestracja użytkownika')
      })
 })

  
app.post('/login', function( req,res ) {
    var email = req.body.email;
    var password = req.body.password;
    let error = "";
    db.collection('users').findOne({email :email},function(err,result) {
       if (err) return console.log(err)
       else if(result){
            if(result.password == password){
                console.log('Pomyślne zalogowanie użytkownika')
                req.session.email = email
                res.end('ok')
            }
            else{
                error = 'Błędne hasło';
                return console.log(error)
            }
       }
        else{
            error = 'Błędny email';
            return console.log(error)
        }

    })
    
 })

 app.get('/logout', (req,res,next)=>{
    req.session.destroy();
    console.log('Wylogowano')
    res.redirect('/');
  });

app.post('/form', function( req,res ) {
   var place = req.body.place;
   var segregation = req.body.segregation;
   var disposable = req.body.disposable;
   var smog = req.body.smog;
   var number = req.body.number;
   var date = req.body.date;
   db.collection('ecology').insertOne({number: number, date: date, place :place, segregation: segregation, disposable: disposable, smog: smog},function(err,result) {
       if (err) return console.log(err)
       console.log('Pomyślnie dodano wyniki zalogowanego użytkownika')
    })
 })
  
 app.post('/insert', function( req,res ){
   db.collection('ecology').insertOne(req.body,function(err,result) {
       if (err) return console.log(err)
       console.log('Pomyślnie dodano wyniki z bazy offline')
    })
})

app.get('/showdata', function(req, res) {
  var cursor = db.collection('ecology').find().toArray(function(err, results) {
     if (err) return console.log(err)     
     res.json(results)
  })
})

