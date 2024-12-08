const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
}

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}

module.exports.showListingPage = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"},}).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist");    
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
}

module.exports.renderEditForm = async (req, res, next) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist");    
        res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
    res.render("listings/edit.ejs", {listing, originalImageUrl});
}

module.exports.createListing = async (req, res, next) => {
    // let {title, description, image, price, country, location} = req.body;
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename}
    await newListing.save();
    req.flash("success", "New Listing Added");
    res.redirect("/listings");
}

module.exports.deleteListing = async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
}

module.exports.updateListing = async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    if(typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename}
    await listing.save();
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
    }
}