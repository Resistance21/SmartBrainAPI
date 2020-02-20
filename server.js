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
      connectionString: 'process.env.DATABASE_URL',
      ssl: true,
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

app.get("/", (req, res ) => { res.send("WORKING!") })

app.post('/signin', (req, res) => {signin.signinHandle(req, res, db, bcrypt)});

app.post("/register", (req, res) => {register.handleRegister(req, res, db, bcrypt)});


app.get('/profile/:id', (req, res) =>{profileLookUp.profileLookUp(req, res, db)});


app.put('/image', (req,res) => {entryIncrament.imageEntryIncrament(req, res, db)});

app.post('/imageurl', (req,res) => {entryIncrament.handleAPI(req, res)});


app.listen(process.env.PORT || 3100, () =>{
    console.log(`App running on portl ${process.env.PORT}`);
})