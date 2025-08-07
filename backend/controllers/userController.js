import asyncHandler from "../middleware/asyncHandler.js";
import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
  let { name, email, password } = req.body;
  let salt = await bcrypt.genSalt(10);
  let encryptedPassword = await bcrypt.hash(password, salt);
  let existingUser = await Users.findOne({ email: email });

  if (existingUser) {
    return res.status(400).json({ message: "user alredy exist" });
  }

  const user = await Users.create({
    name,
    email,
    password: encryptedPassword,
  });

  res.status(201).json(user);
});

const loginUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  let user = await Users.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    generateToken(user._id, res);

    res.status(200).json({
      name: user.name,
      email: user.email,
      _id: user._id,
      isAdmin:user.isAdmin
    });
  } else {
    res.status(500).json({ message: "incorrect email or password" });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ mesage: "logout success" });
});


const getUsers = asyncHandler(async (req, res) => {

    const users = await Users.find()

    res.json(users)

})

const deleteUser = asyncHandler(async(req,res)=>{

const user=await Users.findById(req.params.id)

if (user){
   
  if(user.isAdmin){
     res.status(400)
     throw new Error("can not delete admin");
  }
  await Users.deleteOne({_id:user._id})

  res.json({ message: 'user removed' })
}else{
   res.status(404)
        throw new Error("user not found");
}
})

const updateUser= asyncHandler(async(req,res)=>{


  
  const {email,isAdmin,name}=req.body

  const user = await Users.findById(req.params.id)

    
    if (user) {

        user.name = name || user.name
        user.email = email || user.email
        user.isAdmin = Boolean(isAdmin) || user.isAdmin

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })

    } else {
        res.status(404)
        throw new Error("user not found");
    }

})

    const updateUserProfile = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body

    const user = await Users.findById(req.user._id)

    if (user) {
        user.name = name || user.name
        user.email = email || user.email

        if (password) {
            const salt = await bcrypt.genSalt(10)
            const encrycptedPassword = await bcrypt.hash(password, salt)

            user.password = encrycptedPassword
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })

    } else {
        res.status(404)
        throw new Error('User not found')
    }

})

// only for admin
const getUserById = asyncHandler(async (req, res) => {

    const user = await Users.findById(req.params.id)

    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error("user not found");
    }

})


     


export { registerUser, loginUser, logoutUser,getUsers,deleteUser,updateUser,updateUserProfile,getUserById };
