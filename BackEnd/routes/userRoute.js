import express from 'express';
import jwt from "jsonwebtoken";
import {loginUser,registerUser,adminLogin} from '../controllers/userController.js';
import passport from "passport";
const userRouter = express.Router();

userRouter.post('/register', registerUser)

userRouter.post('/login', loginUser)

userRouter.post('/admin', adminLogin)


// Start Google OAuth login
userRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
userRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Generate JWT token for your frontend
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
    // Redirect frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/login?token=${token}`);
  }
);


export default  userRouter;