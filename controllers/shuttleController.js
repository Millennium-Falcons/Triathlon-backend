const  asyncHandler = require("express-async-handler");

// @desc Get all destinations
// @route GET /api/destinations

const getShuttles = asyncHandler( (req,res)=>{
    res.status(200).json({message:"all shuttles"})
    });


const getShuttleById = asyncHandler( (req,res)=>{
    res.status(200).json({message:`get specific shuttle  ${req.params.id}`})
    });


const createShuttle =asyncHandler((req,res)=>{
    console.log("req bidy :",req.body);
    const{name,origin,destination,capacity,type,arrivalTime,departureTime} = req.body;
    if(!name || !origin ||!destination||!arrivalTime ||!departureTime || !capacity || !type){
        res.status(400);
        throw new Error("All fields are mandotory");

    }
    res.status(200).json({message:"create shuttle"})
    });


 const addPassenger =asyncHandler((req,res)=>{
        console.log("req body :",req.body);
        const{name,email,gender,phone,address} = req.body;
        if(!name || !origin ||!destination||!arrivalTime ||!departureTime || !capacity || !type){
            res.status(400);
            throw new Error("All fields are mandotory");
    
        }
        res.status(200).json({message:"create shuttle"})
        });


module.exports = {getShuttles,getShuttleById,createShuttle,addPassenger};