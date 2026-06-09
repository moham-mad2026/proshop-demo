import express from "express";
const router = express.Router();
import {
  registerUser,
  logoutUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUsersByID,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/logout", logoutUser);
router.post("/auth", authUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
router.route("/:id")
  .get(protect, admin, getUsersByID)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

export default router;
