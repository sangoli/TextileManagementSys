const express = require('express');
const router = express.Router();
const catalogAPI = require('../../models/catalog');
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'./angular-src/src/assets/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({
    storage:storage
});

router.post('/upload',upload.single('file'),function (req,res) {
    console.log(req);
    // if (req.file != null){

    // }

   //upload(req,res,function (err) {
   //    if (err){
    //       res.json({success:false});
    //       return;
    //   }else{
     //      console.log(req.file);
     //      res.json({success: true, filename: req.file});
     //  }
   //});
    //fs.createReadStream('/tmp/'+req.file.originalname).pipe(fs.createWriteStream('newLog.log'));
    if (req.file == null){
        res.json({success: false})
    } else{
    res.json({success:true, filename: req.file.originalname});
    }
});


router.post('/catalogElement',function (req,res) {

    let catalogElement = new catalogAPI({
        imageURL: req.body.imageURL,
        unitLengthCost: req.body.unitLengthCost,
        desc: req.body.desc,
        title: req.body.title
    });

    catalogAPI.addCatalogElement(catalogElement, function (err, catalogElement) {
        if (err) {
            res.json({success: false, msg: 'Failed to register user'});
        } else {
            res.json({success: true, msg: 'Catalog Added Successfully!'});
        }
    });
});


router.get('/getCatalogElements',function (req,res) {

    catalogAPI.getCatalog(function (err,catalogs) {
        if (err) throw err;
        else
            res.json(
                {
                    success: true,
                    catalogs: catalogs
                }
            )
    });

});







module.exports = router;