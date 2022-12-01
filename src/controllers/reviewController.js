const BooksModel= require("../models/booksModel");
const UserModel = require("../models/UserModel");
const ReviewModel= require("../models/reviewModel")

const Validations= require("../validations/validation")


const createReview = async function (req, res) {

   
     try {


    const bookId=  req.params.bookId
       const data = req.body
       if (Object.keys(data).length == 0) {
         return res
           .status(400)
           .send({ status: false, message: "No input provided" });
       }
       const {rating,review,reviewedBy,reviewedAt} = data
      
       if (!bookId) {
         return res.status(400).send({ status: false, message: "please enter the bookId" })
       }
       if (!Validations.isValidId(bookId)) {
         return res.status(400).send({ status: false, message: "bookId is not valid" })
       }


   
       if (Object.keys(data).includes("reviewedBy") ) {
        
      if (!Validations.isValidString(reviewedBy)) {
        return res.status(400).send({ status: false, message: "reviewer's name must not empty" })
      }
      if (!Validations.isValidStringName(reviewedBy)) {
        return res.status(400).send({ status: false, message: "reviewer's name must be a proper string value" })
      }
    }
    

      if (!reviewedAt) {
        return res.status(400).send({ status: false, message: "please enter reviewed time" })
      }
    
      if (!Validations.isValidDate(reviewedAt)) {
        return res.status(400).send({ status: false, message: "please provide the date like (year,month,day) " })
      }




      if (!rating) {
        return res.status(400).send({ status: false, message: "please enter the rating " })
      }
      if (!Validations.isValidRating(rating)) {
        return res.status(400).send({ status: false, message: "please provide rating between 1 to 5" })
      }

      if (!review) {
        return res.status(400).send({ status: false, message: "please provide the review " })
      }
      if (!Validations.isValidString(review)) {
        return res.status(400).send({ status: false, message:"review must not be empty" })

      }
      
      if (!Validations.isValidStringName(review)) {
        return res.status(400).send({ status: false, message:"review must be a proper string value" })

      }



      
      const booksIdValidation = await BooksModel.findOne({_id:bookId});

      if(booksIdValidation == null){
        return res.status(400).send({ status: false, message:"there is no any book  associated with this bookId" })

      }
      const booksValidation = await BooksModel.findOne({_id:bookId,isDeleted:false});

      if(booksValidation == null){
        return res.status(400).send({ status: false, message:" book is already deleted" })

      }

       const createReview = await ReviewModel.create(data);
      //  return res.status(201).send({ status: true, data:createReview })

      const newReviewData= await ReviewModel.find({bookId:bookId}).select({isDeleted:0,createdAt:0,updatedAt:0,__v:0})

    
      

       const addReview = await BooksModel.findOneAndUpdate({_id:bookId},{$inc:{
        reviews:1
        }}).lean()


        addReview["reviewsData"]= newReviewData
        

        


        return res.status(201).send({ status: true,message:"success", data:addReview })
     }
     catch (err) {
       return res.status(500).send({ status: false, message: err.message })
     }
   }





  //____________________________Update: Reviews_______________________________________//


  const updateReviews = async function (req, res) {

    
     try {


      const data = req.body
      if (Object.keys(data).length == 0) {
        return res
          .status(400)
          .send({ status: false, message: "No input provided" });
      }

     


          const { reviewedBy , rating,review,} = data


 if (!reviewedBy) {
        return res.status(400).send({ status: false, message: "please enter reviewer's name" })
      }

      if (!Validations.isValidString(reviewedBy)) {
        return res.status(400).send({ status: false, message: "reviewer's name must not empty" })
      }
      if (!Validations.isValidStringName(reviewedBy)) {
        return res.status(400).send({ status: false, message: "reviewer's name must be a proper string value" })
      }



      if (!rating) {
        return res.status(400).send({ status: false, message: "please enter the rating " })
      }
      if (!Validations.isValidRating(rating)) {
        return res.status(400).send({ status: false, message: "please provide rating between 1 to 5" })
      }



      if (!review) {
        return res.status(400).send({ status: false, message: "please provide the review " })
      }
      if (!Validations.isValidString(review)) {
        return res.status(400).send({ status: false, message:"review must not be empty" })

      }


      if (!Validations.isValidStringName(review)) {
        return res.status(400).send({ status: false, message:"review must be a proper string value" })

      }

      const bookId = req.params.bookId 


    
    if (!Validations.isValidId(bookId)) {
      return res.status(400).send({ status: false, message: "bookId is not valid" })
    }

      const books= await BooksModel.findOne({_id:bookId});
      if(books== null){
        return res.status(400).send({ status: false, message:"this  bookId  is not present in database"})
        
      }
      const booksWithDeletedkey = await BooksModel.findOne({_id:bookId,isDeleted:false}).lean()
      if(booksWithDeletedkey== null){

        return res.status(400).send({ status: false, message:"this  book is already deleted"})
      }
   
      



      const reviewId = req.params.reviewId

    
    if (!Validations.isValidId(reviewId)) {
      return res.status(400).send({ status: false, message: "reviewId is not valid" })
    }


      const checkReviewData= await ReviewModel.findOne({_id:reviewId});

      if(checkReviewData== null){
        return res.status(400).send({ status: false, message:"there is no  any review data associated with this reviewId"})
        
      }


     

         const updateNewReviews = await ReviewModel.findOneAndUpdate({_id:reviewId,bookId:bookId},{$set:data},{new:true}).select({isDeleted:0,createdAt:0,updatedAt:0,__v:0})
      // return res.status(201).send({ status: true, data: createCollege })


      // const checkNewReviewData= await ReviewModel.find({bookId:bookId}).select({isDeleted:0,createdAt:0,updatedAt:0,__v:0})


      booksWithDeletedkey["reviewsData"]= updateNewReviews


        return res.status(201).send({ status: true, data: booksWithDeletedkey })







     }
     catch (err) {
       return res.status(500).send({ status: false, message: err.message })
     }
   }




   //_____________________delete:Review________________________________//

   const deleteReviews = async function (req, res) {



    try{

     const bookId = req.params.bookId

   
   if (!Validations.isValidId(bookId)) {
     return res.status(400).send({ status: false, message: "bookId is not valid" })
   }

     const books= await BooksModel.findOne({_id:bookId});
     if(books == null){
       return res.status(400).send({ status: false, message:"this  bookId  is not present in database"})
       
     }
     const booksWithDeletedkey = await BooksModel.findOne({_id:bookId,isDeleted:false}).lean()
     if(booksWithDeletedkey== null){

       return res.status(400).send({ status: false, message:"this  book is already deleted"})
     }
   
     const reviewId = req.params.reviewId

   
   if (!Validations.isValidId(reviewId)) {
     return res.status(400).send({ status: false, message: "reviewId is not valid" })
   }


     const checkReviewData= await ReviewModel.findOne({_id:reviewId});

     if(checkReviewData== null){
       return res.status(400).send({ status: false, message:"there is no  any review data associated with this reviewId"})
       
     }

     const deleteReviewsChecking = await ReviewModel.findOne({_id:reviewId,isDeleted:false})
     if(deleteReviewsChecking== null){
      return res.status(400).send({ status: false, message:"this review is already deleted"})

     }


        const deleteReviews = await ReviewModel.findOneAndUpdate({_id:reviewId,bookId:bookId},{$set:{isDeleted:true}},{new:true})
     // return res.status(201).send({ status: true, data: createCollege })


      const checkNewReviewData= await ReviewModel.find({bookId:bookId}).select({isDeleted:0,createdAt:0,updatedAt:0,__v:0})


     booksWithDeletedkey["reviewsData"]= checkNewReviewData



      // return res.status(201).send({ status: true, data: booksWithDeletedkey })


      const booksWithUpdation = await BooksModel.findOneAndUpdate({_id:bookId},{$inc:{
        reviews:-1}},{new:true})


        
      return res.status(200).send({ status: true, data1: booksWithUpdation })

    }
    catch (err) {
      return res.status(500).send({ status: false, message: err.message })
    }
  }




   module.exports= {createReview,updateReviews,deleteReviews }