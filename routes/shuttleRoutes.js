const express = require("express");
const router = express.Router();
const {getShuttles,getShuttleById,createShuttle, addPassenger,getLocationsByShuttleId,getShuttlesByCriteria,saveBookingRecord}= require("../controllers/shuttleController");


router.route('/').get(getShuttles); 


router.route('/:id').get(getShuttleById);


router.route('/:id/:bId/passenger').post(addPassenger);
    

router.route('/').post(createShuttle);

router.route("/locations/:shuttleId").get(getLocationsByShuttleId);

router.route('/:origin/:destination/:time').get( getShuttlesByCriteria);

router.route('/booking/:bookingId').post(saveBookingRecord);


module.exports= router 