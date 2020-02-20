const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
var knex = require('knex');
const Clarifai = require('clarifai');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profileLookUp = require('./controllers/profile');
const entryIncrament = require('./controllers/imageEntryCount');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smart_brain'
    }
  });

  const saltRounds = 10;

// db.select('*').from('users').then(data => {
//     console.log(data);
// });



const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

const database = {
    user: [
        {
            id: '123',
            name: "John",
            email: "john@gmail.com",
            password: "asd",
            entries: 5,
            joined: new Date()

        },
        {
            id: '124',
            name: "Sally",
            email: "dally@gmail.com",
            password: "dsa123",
            entries: 0,
            joined: new Date()

        }
    ]


}

app.get("/", (req, res ) =>{
    res.json(database.user);
})

app.post('/signin', (req, res) => {signin.signinHandle(req, res, db, bcrypt)});

app.post("/register", (req, res) => {register.handleRegister(req, res, db, bcrypt)});


app.get('/profile/:id', (req, res) =>{profileLookUp.profileLookUp(req, res, db)});


app.put('/image', (req,res) => {entryIncrament.imageEntryIncrament(req, res, db)});

app.post('/imageurl', (req,res) => {entryIncrament.handleAPI(req, res)});


app.listen(3100, () =>{
    console.log("App running on portl 3000");
})