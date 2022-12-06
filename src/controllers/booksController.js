const BooksModel= require("../models/booksModel");
const UserModel = require("../models/UserModel");
const ReviewModel= require("../models/reviewModel")


const Validations= require("../validations/validation")


const createBooks = async function (req, res) {

    
     try {

     if( !(req.body.userId  == req.decode.userId)){

       return res.status(403).send({ status: false, msg: "you are not authorised" })
     }



       const data = req.body
       if (Object.keys(data).length == 0) {
         return res
           .status(400)
           .send({ status: false, message: "No input provided" });
       }
       const { title, excerpt, userId, ISBN,category,subcategory ,releasedAt} = data
       data.releasedAt= moment().format("YYYY-MM-DD")
       
       if (!title) {
         return res.status(400).send({ status: false, message: "please enter the title" })
       }
       if (!Validations.isValidString(title)) {
         return res.status(400).send({ status: false, message: " provide valid title values,it can't be empty" })
       }

       if (!Validations.isValidStringName(title)) {
        return res.status(400).send({ status: false, message: " provide valid title values" })
      }
      


       const titleValidation = await BooksModel.findOne({title:title})
       if (titleValidation != null) {
           return res.status(400).send({ status: false, message: "this title is already present" })
         }



       if (!excerpt) {
        return res.status(400).send({ status: false, message: "please enter the  excerpt values" })
      }
      if (!Validations.isValidString(excerpt)) {
        return res.status(400).send({ status: false, message: " provide valid excerpt values, it can't be empty" })
      }

      if (!Validations.isValidStringName(excerpt)) {
        return res.status(400).send({ status: false, message: " provide valid excerpt string values, it must be a string values , cant't be a number" })
      }


      
      if (!userId) {
        return res.status(400).send({ status: false, message: "please enter the  userId" })
      }
      if (!Validations.isValidId(userId)) {
        return res.status(400).send({ status: false, message: "userId is not valid" })
      }

      const userIdValidation = await UserModel.findOne({_id:userId})
        if (userIdValidation== null) {
            return res.status(404).send({ status: false, message: "this user Id is not registered" })
          }


          if (!ISBN) {
            return res.status(400).send({ status: false, message: "please enter the  ISBN" })
          }
          const ISBNValidation = await BooksModel.findOne({ISBN:ISBN})
          if(ISBNValidation!= null){
            return res.status(400).send({ status: false, message: " ISBN  is already present" })
          }
          if (!Validations.isValidISBN(ISBN)) {
            return res.status(400).send({ status: false, message: "ISBN is not valid" })
          }
    
  
      if(!category) {
        return res.status(400).send({ status: false, message: "please enter the  category" })
      }
      if (!Validations.isValidString(category)) {
        return res.status(400).send({ status: false, message: " provide valid  category values, it cant't be empty" })
      }
        if (!Validations.isValidStringName(category)) {
          return res.status(400).send({ status: false, message: " provide valid  category string  values" })
        }
  
      


        
      if(!subcategory) {
        return res.status(400).send({ status: false, message: "please enter the  subcategory" })
      }
      if (!Validations.isValidString(subcategory)) {
        return res.status(400).send({ status: false, message: " provide valid subcategory values,it can't be empty" })
      }

      if (!Validations.isValidStringName(subcategory)) {
        return res.status(400).send({ status: false, message: " provide valid  subcategory string values" })
      }


      
         
      if(!releasedAt){
        return res.status(400).send({ status: false, message: " please enter release time" })


      }      

      if (!Validations.isValidDate(releasedAt)) {
        return res.status(400).send({ status: false, message: " provide valid date formate(year,month,date)" })
      }
    


      


       const createBooks = await BooksModel.create(data);
       return res.status(201).send({ status: true,message:"success", data: createBooks })
     }
     catch (err) {
       return res.status(500).send({ status: false, message: err.message })
     }
   }





   //_____________getbooks Data__________//




   const getBooksData=  async function(req,res){
    try{

        let data= req.query
     

        let t1= {_id:1,title:1,excerpt:1,userId:1,category:1,releasedAt:1,reviews:1}

        let Booksdata= await BooksModel.find({$and:[data,{isDeleted:false}]}).sort({title:1}).select(t1)

        if(Booksdata.length==0){
            return res.status(404).send({status:false,message:"your request is not correct"})
        }


        res.status(200).send({status:true, message:"success", data:Booksdata})



    

    }catch(error){
        return res.status(500).send({ status: false, message: error.message })
    }
   }


   //_____________________get books data with reviews__________________________


   const getBooksDataWithReviews=  async function(req,res){
    try{


      let bookId= req.params.bookId

      
      if (!Validations.isValidId(bookId)) {
        return res.status(400).send({ status: false, message: "bookId is not valid" })
      }

      
      let BooksdatabyId= await BooksModel.findOne({_id:bookId})
      if(BooksdatabyId== null){
        return res.status(404).send({status:false,message:"this bookId is not registered with this userId"})
    }


       let Booksdata= await BooksModel.findOne({_id:bookId,isDeleted:false}).lean()

        if(Booksdata== null){
            return res.status(404).send({status:false,message:"your request is not correct,book is already deleted"})
        }

        let getBooksDataWithReviews= await ReviewModel.find({bookId:bookId,isDeleted:false}).select({isDeleted:0,createdAt:0,updatedAt:0,__v:0})


        
        Booksdata["reviewsData"]= getBooksDataWithReviews






        res.status(200).send({status:true, message:"success", data:Booksdata})


     


    

    }catch(error){
        return res.status(500).send({ status: false, message: error.message })
    }
   }






   //________________update books data____________



   const updateBooksData =  async function(req,res){
    try{

      let bookId= req.params.bookId


      if (!Validations.isValidId(bookId)) {
        return res.status(400).send({ status: false, message: "bookId is not valid" })
      }


    
     let queryParams= req.query
    
        queryParams._id= bookId
        let data= req.body

        let {title,excerpt,releasedAt,ISBN} = data

        if(Object.keys(data).length==0){
          return res
          .status(400)
          .send({ status: false, message:"provide data in the body" });

      }

      if(Object.keys(data).includes("title")){
      if (!Validations.isValidString(title)) {
        return res.status(400).send({ status: false, message: "provide valid title values" })
      }
      if (!Validations.isValidStringName(title)) {
        return res.status(400).send({ status: false, message: "provide valid title values" })
      }
      
      const titleValidation = await BooksModel.findOne({title:title})
      if (titleValidation != null) {
          return res.status(400).send({ status: false, message: "this title is already present" })
        }

    }


    if(Object.keys(data).includes("excerpt")){
      if (!Validations.isValidString(excerpt)) {
        return res.status(400).send({ status: false, message: "provide valid excerpt values" })
      }
      if (!Validations.isValidStringName(excerpt)) {
        return res.status(400).send({ status: false, message: "provide valid excerpt values" })
      }
    }

    

        if( Object.keys(data).includes("releasedAt")){
        if (!Validations.isValidDate(releasedAt)) {
          return res.status(400).send({ status: false, message:"provide valid date formate like(year,month,date)"})
        }

       }

    if(Object.keys(data).includes("ISBN")){

      if (!Validations.isValidISBN(ISBN)) {
          return res.status(400).send({ status: false, message: "ISBN is not valid" })
        }

        const ISBNValidation = await BooksModel.findOne({ISBN:ISBN})
        if(ISBNValidation!= null){
          return res.status(400).send({ status: false, message: " ISBN  is already present" })
        }

      }

      let BooksDataGettingWithId = await BooksModel.findOne({_id:bookId})
      if(BooksDataGettingWithId== null){
        return res.status(404).send({status:false,message:" bookId is not correct "})
    }
   

             let Booksdata= await BooksModel.find({_id:bookId, isDeleted:false})

        if(Booksdata.length==0){
            return res.status(404).send({status:false,message:"your request is not correct, book is already deleted"})
        }

        let updateBooksData= await BooksModel.findOneAndUpdate(queryParams,{$set:data},{new:true}) 
        if(updateBooksData== null){
          return res.status(404).send({status:false,message:"your request is not correct"})
      }


        res.status(200).send({status:true, message:"success", data:updateBooksData})
 

    }catch(error){
        return res.status(500).send({ status: false, message: error.message })
    }
   }




  //_____________delete Books____________________________//
  const deleteBooksData =  async function(req,res){
    try{


         let bookId= req.params.bookId

      if (!Validations.isValidId(bookId)) {
        return res.status(400).send({ status: false, message: "bookId is not valid" })
      }


      
      let BooksDataGettingWithId= await BooksModel.findOne({_id:bookId})

      if(BooksDataGettingWithId== null){
        return res.status(404).send({status:false,message:" bookId is not correct "})
    }
   

     let Booksdata= await BooksModel.find({_id:bookId, isDeleted:false})

        if(Booksdata.length==0){
            return res.status(404).send({status:false,message:"your request is not correct,book is already deleted"})
        }
        let t1=Date.now()

        let updateBooksData= await BooksModel.findOneAndUpdate({_id:bookId},{$set:{isDeleted:true,deletedAt:t1}},{new:true}) 


        res.status(200).send({status:true, message:"deleted successfully",data:updateBooksData})
 

    }catch(error){
        return res.status(500).send({ status: false, message: error.message })
    }
   }





 module.exports= {createBooks,getBooksData,
    updateBooksData,deleteBooksData,
    getBooksDataWithReviews}