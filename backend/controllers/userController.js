import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc auth user a get token
// @route Post /api/users
// @access Public
const authUser = asyncHandler(async (req, res) => { 
   const { email, password } = req.body;

   // یافتن کاربر با ایمیل
   const user = await User.findOne({ email });
   
   if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);

      res.status(200).json({
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
    const { name, email, password } = req.body;
    
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
    });
    
    if (user) {
      generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
 });

// @desc Logout user / clear cookie
// @route POSt /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => { 
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });


    res.status(200).json({ message: 'Logged out successfully' });
 });

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => { 
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
 });

// @desc Update user profile
// @route GET /api/users/profile
// @access Public
const updateUserProfile = asyncHandler(async (req, res) => { 
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
 });

// @desc Get user 
// @route GET /api/users
// @access Private/admin
const getUsers = asyncHandler(async (req, res) => { 
    const users = await User.find({});
    res.status(200).json(users);
 });

// @desc Get user by id
// @route GET /api/users/:id
// @access Private/admin
const getUsersByID = asyncHandler(async (req, res) => { 
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
 });

// @desc Delete user 
// @route DELETE /api/users/:id
// @access Private/admin
const deleteUser = asyncHandler(async (req, res) => { 
    const user = await User.findById(req.params.id);

    if (user) {
        if (user.isAdmin) {
            res.status(400);
            throw new Error("Can't delete admin user");
        }
        await User.deleteOne({ _id: user._id });
        res.status(200).json({ message: 'User deleted successfully' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
 });

// @desc Update user 
// @route PUT /api/users/:id
// @access Private/admin
const updateUser = asyncHandler(async (req, res) => { 
    const user = await User.findbyId(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    }
 });

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, getUsersByID, deleteUser, updateUser };