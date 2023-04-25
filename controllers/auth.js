
const peopleTable = require("../models/people");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
const signup = async (req, res, next) => {
  console.log(req.body);
  // console.log(req.file);
  const { name, email, password } = req.body;

  
  let obj;
  try {
    obj = await peopleTable.findOne({ email: email });
  } catch (e) {
    return next(e);
  }
  if (obj) return next(new Error("Email already exist .. "));

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new Error("Could'nt hash the password ! Unsafe"));
  }
  
  const createdUser = new peopleTable({
    name, // name: name
    email,
    password: hashedPassword,

  });

  // users.push(createdUser);
  try {
    await createdUser.save();
    console.log("user created successfully");
  } catch (e) {
    console.log("could'nt create new user : (");
    return next(e);
  }

  let token;
 try {
  token = jwt.sign(
    { userId: createdUser._id, email: createdUser.email },
    process.env.JWT_KEY,
    { expiresIn: "1h" }
  );

 } catch (err) {
  return next(new Error("Signup failed ! Can't generate token " , 500))
 }
  res.status(201).json({ user: createdUser, token});
}

const login = async (req, res, next) => {
  console.table(req.body)
   const { email, password } = req.body;

   let result;
   try {
    //  console.log(hashedPassword )
     result = await peopleTable.findOne({ email });
   } catch (err) {
     return next(err);
   }
   if (!result) {
     return next(new Error("No such user Exist , Please signup "));
   }
 
   let isValid = false;
   try {
     isValid = await bcrypt.compare(password, result.password);
   } catch (err) {
     return next(new Error("Please try again "));
   }
 
   if (!isValid) {
     return next(new Error("Invalid credentials !! "));
   }
   let token;
  try {
   token = jwt.sign(
     { userId: result._id, email: result.email },
     process.env.JWT_KEY,
     { expiresIn: "1h" }
   );
 console.log(token)
  } catch (err) {
   return next(new Error("Login failed ! Can't generate token " , 500))
  }
  
   res
     .status(200)
     .json({ message: "Logged in successfully", user: result.toObject() , token });
}

const getUser = () => {  }
const obj = { login, signup, getUser };

module.exports = obj;