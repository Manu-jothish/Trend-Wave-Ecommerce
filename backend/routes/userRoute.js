import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  getUsers,
  deleteUser,
  updateUserProfile,
  updateUser,
  getUserById
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const userRoute = express.Router();

userRoute.route("/").get(protect, admin, getUsers).post(loginUser);
userRoute.post("/register", registerUser);
userRoute.get("/logout", logoutUser);

userRoute.route("/:id")
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser)
  .get(protect, admin, getUserById)

export default userRoute;
