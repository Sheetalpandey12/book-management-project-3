
//__________________________ Import  ___________________________________________

const mongoose = require("mongoose");
//________________________ Validations : Email  ___________________________________________

const isValidEmail = function (email) {
  const emailRegex =/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[com]+)*$/;
  return emailRegex.test(email);
};

//__________________________ Validations : password  ___________________________________________
      // Password Id Validation
    const  isValidPassword = function (password) {
        const passwordRegex = /[a-zA-Z0-9]{6,10}[@#$%]{3,5}/;
        //Minimum 1 Upper add, Minimum 3 Lower Case,Mininum 1 specia; Symbol like (@#$%),mininum 1 number
        return passwordRegex.test(password)
    };

//__________________________ Validations : MobileNumber  ___________________________________________
const isValidMobileNumber = function (phone) {
    const MobileNumberRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return MobileNumberRegex.test(phone);
  };

//__________________________ Validations : Values ___________________________________________

const isValidString = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value == "string" && value.trim().length === 0) return false;
  return true;
};




//__________________________Validations:pincode___________________________________________
 
const isValidPincode=function(pincode){
    const t1=/^[1-9][0-9]{5}$/
   return  t1.test(pincode)
  }



  //_______________________Validations:UserId____________________________________________

  const isVaidUserId= function(userId){
    let Id= mongoose.Types.ObjectId
      return Id.isValid(userId)
  }


  //_______________________validations:ISBN___________________________________________________

   const isValidISBN= function(ISBN){

    const ISBNRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
   return  ISBNRegex.test(ISBN)
    
   }


//__________________________ Export : Modules  ___________________________________________

module.exports = {
  isValidString,
  isValidEmail,
  
  isValidPassword,
  isValidMobileNumber,
  isValidPincode,
  isVaidUserId,
  isValidISBN

  
};