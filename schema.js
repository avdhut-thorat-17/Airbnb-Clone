import Joi from 'joi';

// Listing Joi Schema
export const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    location: Joi.string(),
    country: Joi.string(),
    price: Joi.number().min(0),
    image: Joi.string().allow('', null),
  }).required(),
});

// Review Joi Schema
export const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});

// Credentials Register Joi Schema
export const registerSchema = Joi.object({
  info: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    dob: Joi.date().required(),
  }).required(),
});
