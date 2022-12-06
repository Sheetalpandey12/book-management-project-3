const mongoose = require("mongoose");

// const moment= require("moment");

const objectId = mongoose.Schema.Types.ObjectId;


const booksSchema= new mongoose.Schema({


        title:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        excerpt:{
            type:String,
            required:true,
            trim:true
            
        },
        userId:{
            type:objectId,
            required:true,
            ref:"User",
            trim:true
        },
        ISBN:{
            type:String,
            required:true,
            unique:true,
            trim:true
        } ,
        category:{
            type:String,
            required:true,
            trim:true
        },
        subcategory:{
            type:String,
            required:true,
            trim:true

        },
        reviews:{
            type:Number,
            default:0,
            trim:true
            
        },

        deletedAt :String,
        isDeleted:{
            type:Boolean,
            default:false
        },
        releasedAt:{
            type:Date,
            required:true,
            trim:true
          
        },
        bookCover:String   


        
      
    

     

},{timestamps:true});

module.exports= mongoose.model("Book",booksSchema)