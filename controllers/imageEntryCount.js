const Clarifai = require('clarifai');


const app = new Clarifai.App({
    apiKey: 'c52816cbe4d14993aadb6fd54b00e1c1'
   });

  const handleAPI = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json("error with image") )
  }


const imageEntryIncrament = (req, res, db) => {
    const { id } = req.body;
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Error adding entry'))
}

module.exports = {
    imageEntryIncrament: imageEntryIncrament,
    handleAPI: handleAPI
}