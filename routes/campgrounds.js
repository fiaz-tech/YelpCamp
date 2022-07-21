const express = require('express');
const router = express.Router();
const ExpressError = require('../utils/ExpressError');
const campground = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const { campgroundSchema } = require('../schemas.js');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');

const multer = require('multer');

const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
.get(catchAsync(campground.index))
.post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campground.createNewCampground))


//.post(upload.array('image'), (req, res) => {
//    console.log(req.body, req.files);
//    res.send("IT WORKED")
//})


router.get('/new', isLoggedIn, campground.renderNewForm)

router.route('/:id')
    .get(catchAsync(campground.renderShowPage))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campground.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campground.deleteCampground))
   
   
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campground.renderEditForm))
   
   
module.exports = router;