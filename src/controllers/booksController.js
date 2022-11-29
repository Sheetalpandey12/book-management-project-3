const BooksModel= require("../models/booksModel");
const UserModel = require("../models/UserModel");

const Validations= require("../validations/validation")


const createBooks = async function (req, res) {

    
     try {
       const data = req.body
       if (Object.keys(data).length == 0) {
         return res
           .status(400)
           .send({ status: false, message: "No input provided" });
       }
       const { title, excerpt, userId, ISBN,category,subcategory ,releasedAt} = data
       
       if (!title) {
         return res.status(400).send({ status: false, message: "please enter the title" })
       }
       if (!Validations.isValidString(title)) {
         return res.status(400).send({ status: false, message: " provide valid title values" })
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
        return res.status(400).send({ status: false, message: " provide valid excerpt values" })
      }

      if (!Validations.isValidStringName(excerpt)) {
        return res.status(400).send({ status: false, message: " provide valid title values" })
      }


      
      if (!userId) {
        return res.status(400).send({ status: false, message: "please enter the  userId" })
      }
      if (!Validations.isValidId(userId)) {
        return res.status(400).send({ status: false, message: "userId is not valid" })
      }

      const userIdValidation = await UserModel.findOne({_id:userId})
        if (userIdValidation== null) {
            return res.status(400).send({ status: false, message: "this user Id is not registered" })
          }


          if (!ISBN) {
            return res.status(400).send({ status: false, message: "please enter the  userId" })
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
        return res.status(400).send({ status: false, message: " provide valid excerpt values" })
      }
        if (!Validations.isValidStringName(category)) {
          return res.status(400).send({ status: false, message: " provide valid title values" })
        }
  
      


        
      if(!subcategory) {
        return res.status(400).send({ status: false, message: "please enter the  userId" })
      }
      if (!Validations.isValidString(subcategory)) {
        return res.status(400).send({ status: false, message: " provide valid excerpt values" })
      }

      if (!Validations.isValidStringName(subcategory)) {
        return res.status(400).send({ status: false, message: " provide valid title values" })
      }



         
      if(!releasedAt) {
        return res.status(400).send({ status: false, message: "please enter the  releasing date" })
      }

      if (!Validations.isValidDate(releasedAt)) {
        return res.status(400).send({ status: false, message: " provide valid date formate" })
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
        if(Object.keys(data).length==0){
            return res
            .status(400)
            .send({ status: false, message:"provide some query"});

        }



        let t1= {_id:1,title:1,excerpt:1,userId:1,category:1,releasedAt:1,reviews:1}

        let Booksdata= await BooksModel.find({$and:[data,{isDeleted:false}]}).select(t1).sort({title:1})

        if(Booksdata.length==0){
            return res.status(404).send({status:false,message:"your request is not correct"})
        }


        res.status(200).send({status:true, message:"success", data:Booksdata})


      //  Returns all books in the collection that aren't deleted. Return only book _id, title, excerpt, userId, category, releasedAt, reviews field. Response example here


    

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
        if(Object.keys(queryParams).length==0){
            return res
            .status(400)
            .send({ status: false, message:"provide some query" });

        }
        let data= req.body

        let {title,excerpt,releasedAt,ISBN} = data

        if(Object.keys(data).length==0){
          return res
          .status(400)
          .send({ status: false, message:"provide data in the body" });

      }
      if (!Validations.isValidString(title)) {
        return res.status(400).send({ status: false, message: "provide valid title values" })
      }

      const titleValidation = await BooksModel.findOne({title:title})
      if (titleValidation != null) {
          return res.status(400).send({ status: false, message: "this title is already present" })
        }

        if(releasedAt){
        if (!Validations.isValidDate(releasedAt)) {
          return res.status(400).send({ status: false, message:"provide valid date formate"})
        }

      }



      if(ISBN){

      if (!Validations.isValidISBN(ISBN)) {
          return res.status(400).send({ status: false, message: "ISBN is not valid" })
        }

        const ISBNValidation = await BooksModel.findOne({ISBN:ISBN})
        if(ISBNValidation!= null){
          return res.status(400).send({ status: false, message: " ISBN  is already present" })
        }

      }
      


       

        let Booksdata= await BooksModel.find({_id:bookId, isDeleted:false})

        if(Booksdata.length==0){
            return res.status(404).send({status:false,message:"your request is not correct,already deleted"})
        }

        let updateBooksData= await BooksModel.findOneAndUpdate(queryParams,{$set:data},{new:true}) 


        res.status(200).send({status:true, message:"success", data:updateBooksData})
 

    }catch(error){
        return res.status(500).send({ status: false, message: error.message })
    }
   }




  //_____________delete Books____________________________//
  const deleteBooksData =  async function(req,res){
    try{

      let userId = req.query.userId
      if(!userId){
        return res.status(400).send({ status: false, message:"userId is required in query for authorization" })
      }

        if (!Validations.isValidId(userId)) {
          return res.status(400).send({ status: false, message:"userId is not valid" })
        }

      

      let bookId= req.params.bookId


      if (!Validations.isValidId(bookId)) {
        return res.status(400).send({ status: false, message: "bookId is not valid" })
      }


     


     

        let Booksdata= await BooksModel.find({_id:bookId, isDeleted:false})

        if(Booksdata.length==0){
            return res.status(404).send({status:false,message:"your request is not correct,already deleted"})
        }

        let updateBooksData= await BooksModel.findOneAndUpdate({_id:bookId},{$set:{isDeleted:true}},{new:true}) 


        res.status(200).send({status:true, message:"success", data:updateBooksData})
 

    }catch(error){
        return res.status(500).send({ status: false, message: error.message })
    }
   }














   module.exports= {createBooks,getBooksData,updateBooksData,deleteBooksData}