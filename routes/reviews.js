const express = require('express');
const router = express.Router({mergeParams: true});

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const Review = require('../models/review');
const review = require('../controllers/reviews');

const { validateReview, isReviewAuthor, isLoggedIn } = require('../middleware');

router.post('/', isLoggedIn, validateReview, catchAsync(review.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(review.deleteReview))


module.exports = router;