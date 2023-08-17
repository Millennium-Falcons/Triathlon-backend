const express = require("express");
const router = express.Router();
const {getDestinations,getDestinationById,createDestination}= require("../controllers/destinationController");


router.route('/').get(getDestinations);


router.route('/:id').get(getDestinationById);
    


router.route('/').post(createDestination);

module.exports= router