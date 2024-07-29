import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  comment: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Default should be a function, not a value
  },
});

// Export the model
export default mongoose.model('Review', reviewSchema);
