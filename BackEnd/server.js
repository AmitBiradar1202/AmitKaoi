import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import connectCloudinary from './config/cloudinary.js';
import connectDB from './config/mongodb.js';
import userModel from "./models/userModel.js";
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoute.js';

//app config
const app = express();
const PORT = process.env.PORT || 3000;
connectDB()
connectCloudinary();

//Middlewares
app.use(express.json())
app.use(cors());
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "backendUrl/api/user/google/callback", // backend URL + route
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await userModel.findOne({ googleId: profile.id });
    if (!user) {
      user = await userModel.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id
      });
    }
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));


passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});


//api EndPoint
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter);

//api testing and connection with port 
app.get('/',(req,res)=>{
res.send("API working")
})
app.listen(PORT,()=>{
    console.log(`Server is  running on address http://localhost:${PORT}`)
})