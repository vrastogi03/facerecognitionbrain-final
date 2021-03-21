const Clarifai =require( 'clarifai');
const { handleProfile } = require('./profile');

const app = new Clarifai.App({
    apiKey: 'eb601bbd107d4fcebf56fbd9c27e2fd8'
});

const handleApiCall = (req,res) =>{
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data =>{
        res.json(data);
    })
    .catch(err=> {
        res.status(400).json('unable to work with API')
        console.log(err);    
    })
}

const handleImage = (req,res,knex)=>{
    const {id} = req.body;
    knex('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries =>{
        res.json(entries[0]);
    })
    .catch(eerr=>res.status(400).json('unable to update'))
}

module.exports={
    handleImage: handleImage,
    handleApiCall
};