

const profileLookUp = (req, res, db) =>{
    const { id } = req.params;
    db.select('*').from('users')
    .where({
        id: id
    })
    .then(user =>{
        if(user.length){
            console.log(user[0]);
            res.json(user[0]);
        }else{
            res.status(400).send("user not found!");
        }
    })
    .catch(err => res.status(400).json("Error getting user!"));
}

module.exports ={
    profileLookUp: profileLookUp 
}