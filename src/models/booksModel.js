const mongoose = require("mongoose");

const moment= require("moment");

const objectId = mongoose.Schema.Types.ObjectId;


const booksSchema= new mongoose.Schema({


        title:{
            type:String,
            required:true,
            unique:true
        },
        excerpt:{
            type:String,
            required:true
            
        },
        userId:{
            type:objectId,
            required:true,
            ref:"User"
        },
        ISBN:{
            type:String,
            required:true,
            unique:true
        } ,
        category:{
            type:String,
            required:true
        },
        subcategory:{
            type:String,
            required:true

        },
        reviews:{
            type:Number,
            default:0,
            comment:Number
        },
        isDeleted:{
            type:Boolean,
            default:false
        },
        releasedAt:{
            type:Date,
            required:true,
            default:moment().format("YYYY-MM-DD")
        }   


        
      
    

     

},{timestamps:true});

module.exports= mongoose.model("Book",booksSchema)