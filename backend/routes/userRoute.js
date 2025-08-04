import express from "express"
import { loginUser,logoutUser,registerUser,getUsers,deleteUser } from "../controllers/userController.js"
import { protect,admin } from "../middleware/authMiddleware.js"

const userRoute = express.Router()

userRoute.post('/',loginUser)
userRoute.post('/register',registerUser)
userRoute.get('/logout',logoutUser)

userRoute.route('/').get(protect,admin,getUsers)

userRoute.route('/:id')
      .delete(protect,admin,deleteUser)
      

export default userRoute 