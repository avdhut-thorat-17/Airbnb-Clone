import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import methodOverride from 'method-override';
import cors from 'cors';
// import { fileURLToPath } from 'url';

import ExpressError from './utils/ExpressError.js';
import listings from './routes/listing.js';
import newListing from './routes/newListing.js';
import SignIn from './routes/signin.js';
import Register from './routes/register.js';
import reviews from './routes/review.js';
import Listing from './models/listing.js';
import review from './models/review.js';
import wrapAsync from './utils/wrapAsync.js';

import dotenv from 'dotenv';
dotenv.config();


const app = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, 'client/dist')));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/dist/index.html"));
// });

const port = process.env.PORT || 8080

// Configure CORS
const corsOptions = {
  origin: process.env.CLIENT_URL, // Update this to your frontend's origin
  credentials: true, // Allow cookies and other credentials to be included
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

async function main() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("connected to database!");
  } catch (err) {
    console.log(err);
  }
}

main();

app.use("/", newListing);
app.use("/signin", SignIn);
app.use("/register", Register);
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

// Default route handling for 404
app.use("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.listen(port, () => {
  console.log("server is listening at port 8080");
});
