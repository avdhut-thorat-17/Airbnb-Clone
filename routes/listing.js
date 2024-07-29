// routes/listing.js
import express from 'express';
import wrapAsync from '../utils/wrapAsync.js';
import { listingSchema } from '../schema.js';
import ExpressError from '../utils/ExpressError.js';
import Listing from '../models/listing.js';
import Review from '../models/review.js'; // Import Review model (assuming it's required)

// Create a router
const router = express.Router();

// Middleware function to be used as a parameter in routes
const validateListing = (req, res, next) => {
  const result = listingSchema.validate(req.body);
  if (result.error) {
    throw new ExpressError(400, result.error);
  } else {
    next();
  }
};

// Reviews POST Route
router.post('/:id/reviews', validateListing, wrapAsync(async (req, res) => {
  console.log("Im in");
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();

  res.redirect(`/listings/${listing._id}`);
}));

// Index route
router.get("/", wrapAsync(async (req, res) => {
  try {
    const allListings = await Listing.find({});
    // console.log("Retrieved listings:", allListings);
    res.json(allListings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}));

// Show route
router.get("/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const currentListing = await Listing.findById(id).populate("reviews");
  res.json(currentListing);
}));

// New and Create Route for Listing
router.post("/", wrapAsync(async (req, res) => {
  // console.log("In post route");
  let myListing = req.body;
  console.log(myListing);

  const newListing = new Listing(myListing);
  await newListing.save();
  res.status(200).json({ success: true, message: "Listing created successfully" });
}));

// Edit Route
router.get("/:id/edit", async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      throw new ExpressError(404, "Listing not found");
    }
    res.json({ listing });
  } catch (err) {
    next(err);
  }
});

// Update Route
router.put("/:id", async (req, res, next) => {
  try {
    const { description, price } = req.body;
    await Listing.findByIdAndUpdate(req.params.id, { description, price });
    res.json({ success: true, message: "Listing updated successfully" });
  } catch (err) {
    next(err);
  }
});

// Delete Route for Listing
router.delete("/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.json({ success: true, message: "Listing deleted successfully" });
}));

export default router;
