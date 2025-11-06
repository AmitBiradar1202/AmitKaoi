import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "./models/userModel.js";

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
app.use(passport.session());
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
 callbackURL:
        "https://amitkaoi.onrender.com/api/user/google/callback"
          

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