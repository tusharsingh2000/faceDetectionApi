const Clarifai = require('clarifai');
const app = new Clarifai.App({
	apiKey: '0d841ba22fa147ef8c646f7d3ba22c55'
   });

const handleApiCall = (req,res) =>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)  
    .then(data=>{
        res.json(data)
    })
    .catch(err=> res.status(400).json('Unable to work with API'))
} 
 

const handleImage = (req,res,db)=>{
    const {id} = req.body;
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0]);
    })
    
    .catch(err=>res.status(404).json('User not found'));
}
module.exports={
    handleImage : handleImage,
    handleApiCall : handleApiCall
};