const UserModel= require("../models/UserModel")
const Validations= require("../validations/validation")
const jwt = require("jsonwebtoken");

const createUser = async function (req, res) {

   
     try {
       const data = req.body
       if (Object.keys(data).length == 0) {
         return res
           .status(400)
           .send({ status: false, message: "No input provided" });
       }
       const {title, name, phone,email,password,address } = data

       if (!title) {
        return res.status(400).send({ status: false, message: "please enter the title" })
      }
      if (!Validations.isValidString(title)) {
        return res.status(400).send({ status: false, message: " title must be a proper string value" })
      }

    
       let titleEnum = ["Mr","Mrs","Miss"]
      if (!titleEnum.includes(title)) {
         return res.status(400).send({ status: false, msg: "title should be Mr, Mrs or Miss" })
      }


         if (!name) {
         return res.status(400).send({ status: false, message: "please enter the name" })
       }
       if (!Validations.isValidString(name)) {
         return res.status(400).send({ status: false, message: " name must be a proper string value" })
       }
   
    
       if (!phone) {
         return res.status(400).send({ status: false, message: "please enter the mobileNumber" })
       }
       if (!Validations.isValidMobileNumber(phone)) {
         return res.status(400).send({ status: false, message: "Invalid mobileNumber" })
       }
       
         const phoneValidation = await UserModel.findOne({ phone: phone })
         if (phoneValidation!= null) {
           return res.status(400).send({ status: false, message: "this phone is already register" })
         }
       
       if (!email) {
         return res.status(400).send({ status: false, message: "Please Provide email" })
       }
       if (!Validations.isValidEmail(email)) {
         return res.status(400).send({ status: false, message: "Invalid email" })
       }
   
       const emailValidation = await UserModel.findOne({ email: email})
       if (emailValidation != null) {
         return res.status(400).send({ status: false, message: "this email is already register" })
       }

       if (!password) {
        return res.status(400).send({ status: false, message: "Please Provide password" })
      }
      if (!Validations.isValidPassword(password)) {
        return res.status(400).send({ status: false, message: "Invalid password" })
      }
  
      const passwordValidation = await UserModel.findOne({ password: password})
      if (passwordValidation != null) {
        return res.status(400).send({ status: false, message: "this password is already register" })
      }

      if (!address) {
        return res.status(400).send({ status: false, message: "Please Provide address" })
        
      }
      if(!(address.street || address.city || address.pincode)){
      return res.status(400).send({status:false,message:"street , city and pincode, you must provide all three values"})
      }
      if(!Validations.isValidString((address.street || address.city  ))){
        return res.status(400).send({ status: false, message: "you must provide valid values for street and city" })

     }

     if(!Validations.isValidPincode(address.pincode)){
        return res.status(400).send({ status: false, message: " pincode is not a valid pincode" })

     }


       const createCollege = await UserModel.create(data);
       return res.status(201).send({ status: true, data: createCollege })
     }
     catch (err) {
       return res.status(500).send({ status: false, message: err.message })
     }
   }


//_________________________//
   

   const login = async function (req, res) {
    try {
        let data= req.body;
       
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "Invalid request Please provide valid  details" });
        }

        const {email,password}= data

        if (!email) return res.status(400).send({ msg: " email is required " })
        if (!password) return res.status(400).send({ msg: "  password is required " })

        if (!Validations.isValidString(email)) {
            return res.status(400).send({status: false,msg: "please provide valid email details"});
        }
        
        if (!Validations.isValidString(password)) {
          return res.status(400).send({status: false,msg: "please provide valid password details"});
      }


 


        let loggedUser = await UserModel.findOne({ email: email, password: password })
        if (loggedUser == null) return res.status(400).send({ msg: "Email or Password is not a registered email or password" })

        let token = jwt.sign(
            {
                userId: loggedUser._id.toString(),
                batch: "lithium",
                project: "Books-Management"
            },
            "Secret-Key-lithium", { expiresIn: '12h' }
        )

     return res.status(201).send({ status:true, message:"success",data:token })
    } catch (error) {
       return res.status(500).send({ msg: error.message })
    }
}



   module.exports= {createUser,login}