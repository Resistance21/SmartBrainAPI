
const handleRegister = (req, res, db, bcrypt) => {
    if(req.body.name != "" && req.body.email != '' && req.body.password != ''){
        //res.send("Registered");
        const { name, email, password} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        console.log(hash);
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail =>{
            return trx('users')
                .returning('*')
                .insert({
                    name: name,
                    email: loginEmail[0],
                    joined: new Date()
                }).then(user => {
                    res.json(user[0])
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch(err => {
            res.json("error");
            console.log(err);
        });
    }else{
        res.json("a field was left blank!");
    }
}

module.exports = {
    handleRegister: handleRegister
};