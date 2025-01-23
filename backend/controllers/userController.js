import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';

// @desc auth user a get token
// @route Post /api/users
// @access Public
const authUser = asyncHandler(async (req, res) => { 
   const { email, password } = req.body;

   // یافتن کاربر با ایمیل
   const user = await User.findOne({ email });
   
   if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
         expiresIn: '30d',
      });

      //set JWT as HTTP-only cookie
      res.cookie('jwt', token, {
         httpOnly: true,
         secure: process.env.NODE_ENV !== 'development',
         sameSite: 'strict',
         maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
      });
   } else {
      res.status(401).json({ message: 'Invalid email or password' });
   }
});

// @desc register a user
// @route GET /api/users/login
// @access Public
const registerUser = asyncHandler(async (req, res) => { 
    res.send('Register user')
 });

// @desc Logout user / clear cookie
// @route POSt /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => { 
    res.send('logout user')
 });

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => { 
    res.send('get user profile')
 });

// @desc Update user profile
// @route GET /api/users/profile
// @access Public
const updateUserProfile = asyncHandler(async (req, res) => { 
    res.send('update user profile')
 });

// @desc Get user 
// @route GET /api/users
// @access Private/admin
const getUsers = asyncHandler(async (req, res) => { 
    res.send('get users')
 });

// @desc Get user by id
// @route GET /api/users/:id
// @access Private/admin
const getUsersByID = asyncHandler(async (req, res) => { 
    res.send('get user by id')
 });

// @desc Delete user 
// @route DELETE /api/users/:id
// @access Private/admin
const deleteUser = asyncHandler(async (req, res) => { 
    res.send('delete user')
 });

// @desc Update user 
// @route PUT /api/users/:id
// @access Private/admin
const updateUser = asyncHandler(async (req, res) => { 
    res.send('update user')
 });

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, getUsersByID, deleteUser, updateUser };