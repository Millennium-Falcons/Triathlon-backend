const express = require("express");
const router = express.Router();
const {getDestinations,getDestinationById,createDestination,bookShuttle}= require("../controllers/destinationController");


router.route('/').get(getDestinations);


router.route('/:id').get(getDestinationById);
    


router.route('/').post(createDestination);


//testing
router.route('/book').post(bookShuttle);


module.exports= router