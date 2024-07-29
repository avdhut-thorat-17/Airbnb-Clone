import express from 'express';
import wrapAsync from '../utils/wrapAsync.js';
import { listingSchema } from '../schema.js';
import ExpressError from '../utils/ExpressError.js';
import Listing from '../models/listing.js';

// Create a router
const router = express.Router();

// All /listings related routes 

// Index route
router.get("/", wrapAsync(async (req, res) => {
  try {
    // Fetch data from the database
    const allListings = await Listing.find({});
    console.log("Retrieved listings:", allListings);
    res.json(allListings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}));

// Show route
// router.get("/login", wrapAsync(async (req, res) => {
//     // logic of login
// }));

export default router;
