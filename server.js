const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');

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
            entries: 0,
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

app.post('/signin', (req, res) => {
    //     //Load hash from your password DB.
    // bcrypt.compare("asd", '$2a$10$nIqDetmDo0w.vlsjgGexZ.T3KIjdPMcEVU8MbJtNtTC3iSDjUgnHK', function(err, res) {
    //     // res === true
    //     console.log(`True: ${res} !`);
    // });
    // bcrypt.compare("asd", '$2a$10$nIqDetmDo0w.vlsjgGexZ.T3KIjdPMcEVU8MbJtNtTC3iSDjUgnHK', function(err, res) {
    //     // res === false
    //     console.log(`False: ${res} !`);
    // });
    if(req.body.email === database.user[0].email
        && req.body.password === database.user[0].password){
            res.json('Success');
        }else{
            res.status(400).json("error logging in")
        }
})

app.post("/register", (req, res) =>{
    if(req.body.name != "" && req.body.email != '' && req.body.password != ''){
        //res.send("Registered");
        const { name, email, password} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        console.log(hash)
        database.user.push(
            {
                id: '125',
                name: name,
                email: email,
                password: password,
                entries: 0,
                joined: new Date()
    
            }
        )
        res.json(database.user[database.user.length-1]);
    }else{
        res.send('Error registering');
    }
})


app.get('/profile/:id', (req, res) =>{
    const { id } = req.params;
    let found = false;
    database.user.forEach(user =>{
        if(user.id === id){
            return res.json(user);
        }
    })
    if(!found){
        res.status(404).send("no user found");
    }
})


app.post('/image', (req,res) => {
    const { id } = req.body;
    let found = false;
    database.user.forEach(user =>{
        if(user.id === id){
            user.entries++;
            return res.json(user.entries);
        }
    })
    if(!found){
        res.status(404).send("no user found");
    }
})

// // Load hash from your password DB.
// bcrypt.compare("B4c0/\/", hash, function(err, res) {
//     // res === true
// });
// bcrypt.compare("not_bacon", hash, function(err, res) {
//     // res === false
// });

// // As of bcryptjs 2.4.0, compare returns a promise if callback is omitted:
// bcrypt.compare("B4c0/\/", hash).then((res) => {
//     // res === true
// });




app.listen(3100, () =>{
    console.log("App running on portl 3000");
})