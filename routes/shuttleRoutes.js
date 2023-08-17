const express = require("express");
const router = express.Router();
const {getShuttles,getShuttleById,createShuttle, addPassenger}= require("../controllers/shuttleController");


router.route('/').get(getShuttles);


router.route('/:id').get(getShuttleById);


router.route('/:id').post(addPassenger);
    

router.route('/').post(createShuttle);

module.exports= router