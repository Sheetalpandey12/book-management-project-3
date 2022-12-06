const express= require("express")
const router= express.Router()
const aws= require("aws-sdk")

const middleware= require("../middleware/middleware")

const userController = require("../controllers/userController")
const BooksController = require("../controllers/booksController")
const ReviewController = require("../controllers/reviewController")

router.post("/", function(req,res){
    res.send("done")
})

router.post("/register",userController.createUser)
router.post("/login",userController.login)
router.post("/books",middleware.authenticate,BooksController.createBooks)
router.get("/books",middleware.authenticate,BooksController.getBooksData)
router.get("/books/:bookId",middleware.authenticate,BooksController.getBooksDataWithReviews)
router.put("/books/:bookId",middleware.authenticate,middleware.authorize,BooksController.updateBooksData)
router.delete("/books/:bookId",middleware.authenticate,middleware.authorize,BooksController.deleteBooksData)
router.post("/books/:bookId/review",ReviewController.createReview)
router.put("/books/:bookId/review/:reviewId",ReviewController.updateReviews)
router.delete("/books/:bookId/review/:reviewId",ReviewController.deleteReviews)



aws.config.update({
    accessKeyId: "AKIAY3L35MCRZNIRGT6N",
    secretAccessKey: "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",
    region: "ap-south-1"
})

let uploadFile= async ( file) =>{
   return new Promise( function(resolve, reject) {
    // this function will upload file to aws and return the link
    let s3= new aws.S3({apiVersion: '2006-03-01'}); // we will be using the s3 service of aws

    var uploadParams= {
        ACL: "public-read",
        Bucket: "classroom-training-bucket",  //HERE
        Key: "abc/" + file.originalname, //HERE 
        Body: file.buffer
    }


    s3.upload( uploadParams, function (err, data ){
        if(err) {
            return reject({"error": err})
        }
        console.log(data)
        console.log("file uploaded succesfully")
        return resolve(data.Location)
    })

    // let data= await s3.upload( uploadParams)
    // if( data) return data.Location
    // else return "there is an error"

   })
}

router.post("/write-file-aws", async function(req, res){

    try{
        let files= req.files
        if(files && files.length>0){
            //upload to s3 and get the uploaded link
            // res.send the link back to frontend/postman
            let uploadedFileURL= await uploadFile( files[0] )
            res.status(201).send({msg: "file uploaded succesfully", data: uploadedFileURL})
        }
        else{
            res.status(400).send({ msg: "No file found" })
        }
        
    }
    catch(err){
        res.status(500).send({msg: err})
    }
    
})











router.all("/*", function(req,res){
    res.status(400).send({message:"url is wrong"})
})


module.exports = router