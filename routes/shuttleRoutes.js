const express = require("express");
const router = express.Router();
const {getShuttles,getShuttleById,createShuttle}= require("../controllers/shuttleController");


router.route('/').get(getShuttles);


router.route('/:id').get(getShuttleById);
    


router.route('/').post(createShuttle);

module.exports= router