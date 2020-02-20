

const signinHandle = (req, res, db, bcrypt) => {    
    db.select('email', 'hash').from("login")
    .where('email', '=', req.body.email)
    .then(data => {
        const isVaild = bcrypt.compareSync(req.body.password, data[0].hash);
        if(isVaild){
            return db.select('*').from('users')
            .where('email', '=', req.body.email)
            .then(user =>{
            res.json(user[0])
            }
        )}else if(!isVaild){
            resstatus(400).json("Wrong user or password!")
        }
    })
    .catch(err => res.status(400).json("Error logging in"));
}

module.exports = {
    signinHandle: signinHandle
}
