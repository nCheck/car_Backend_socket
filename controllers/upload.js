const router = require('express').Router()
const imgur = require('imgur');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    let filename = file.originalname.split('.');
    cb(null, filename[0] + '-' + Date.now() + '.' +  filename[1])
  }
})
const upload = multer({storage});


router.route('/' )
    .post(upload.single('file') , (req , res) =>{
        
        // console.log(req.file)
        // res.send({ status : true, url : '' })
      
        // A single image

        imgur.uploadFile(req.file.path)
        .then(function (json) {

            let url = json.data.link,
                deleteId = json.data.deletehash
            console.log(json.data);
            res.send({url , deleteId , status : true})
        })
        .catch(function (err) {
            console.error(err.message);
            res.send({...err, status : false, url : ''})
        });        

    } )














module.exports = router