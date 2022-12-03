
//__________________________ Import  ___________________________________________

const mongoose = require("mongoose");
//________________________ Validations : Email  ___________________________________________

const isValidEmail = function (email) {
  const emailRegex =/^(\<)?[\w\d._%+-]+@(?:[\w\d-]+\.)+(\w{2,4})(\>)?(,|$)/
  return emailRegex.test(email);
};

//__________________________ Validations : password  ___________________________________________
      // Password Id Validation
    const  isValidPassword = function (password) {
      passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
      
        return passwordRegex.test(password)
    };

//__________________________ Validations : MobileNumber  ___________________________________________
const isValidMobileNumber = function (phone) {
    const MobileNumberRegex =/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
    
    return MobileNumberRegex.test(phone);
  };

//__________________________ Validations : Values ___________________________________________

const isValidString = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if(typeof value!=="string")return false
  if (value.trim().length === 0) return false;
  return true;
};




//__________________________Validations:pincode___________________________________________
 
const isValidPincode=function(pincode){
    const t1=/^[1-9][0-9]{5}$/
   return  t1.test(pincode)
  }



  //_______________________Validations:UserId____________________________________________

  const isValidId= function(userId){
    let Id= mongoose.Types.ObjectId
      return Id.isValid(userId)
  }


  //_______________________validations:ISBN___________________________________________________

   const isValidISBN= function(ISBN){

    const ISBNRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
   return  ISBNRegex.test(ISBN)
    
   }


   //________________________validation date formate___________________________________
   const isValidDate= function(releasedAt){

    const ValidateDate =  /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
   return ValidateDate.test(releasedAt)

 
   }

   //______________________validation :name_________________________________________
   const isValidStringName= function(name){

    const ValidateName =/^[A-Za-z ][A-Za-z -._]{2,}$/;
    
   return ValidateName.test(name)

 
   }

   //________________________validation:ratings________________________________________//
   const isValidRating = function(rating){

    const ValidateRating =/[1-5]{1}/;
    
   return ValidateRating.test(rating)

 
   }


   //____________________________validations:Review______________________________//
   const isValidReview = function(review){

    const ValidateReview =/[a-zA-Z0-9]{3,}/;
    
   return ValidateReview.test(review)

 
   }


   //_________________________________validation :Gali_____________________________//


   const isValidSreet = function(street){

    const ValidateStrret =/^[A-Za-z ][A-Za-z -._ : = 0-9]{2,}$/;
    
   return ValidateStrret.test(street)

 
   }



//__________________________ Export : Modules  ___________________________________________

module.exports = {
  isValidString,
  isValidEmail,
  
  isValidPassword,
  isValidMobileNumber,
  isValidPincode,
  isValidId,
  isValidISBN,
  isValidDate,
  isValidStringName,
  isValidRating,
  isValidReview,
  isValidSreet
  

  
};