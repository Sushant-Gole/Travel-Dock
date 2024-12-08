const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const {index, renderNewForm, showListingPage, renderEditForm, createListing, deleteListing, updateListing} = require("../controller/listings.js");
const multer  = require('multer');
const{storage} = require("../cloudconfig.js");
const upload = multer({ storage });


//New Route:-
router.get("/new", isLoggedIn, renderNewForm);

//Create Route:- //Index Route:-
router
.route("/")
.get(wrapAsync(index))
.post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(createListing));
// .post( (req, res) => {
//     res.send(req.file);
// });

//Show Route:- //Delete Route:- //Update Route:-
router
.route("/:id")
.get(wrapAsync(showListingPage))
.delete(isLoggedIn, isOwner, wrapAsync(deleteListing))
.put(isLoggedIn, upload.single("listing[image]"), isOwner, validateListing, wrapAsync(updateListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(renderEditForm));

module.exports = router;