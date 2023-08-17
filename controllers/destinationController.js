const  asyncHandler = require("express-async-handler");

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// @desc Get all destinations
// @route GET /api/destinations

const getDestinations = asyncHandler( (req,res)=>{
    res.status(200).json({message:"all destinations"})
    });


const getDestinationById = asyncHandler( (req,res)=>{
    res.status(200).json({message:`get specific destinations  ${req.params.id}`})
    });


const createDestination =asyncHandler((req,res)=>{
    console.log("req bidy :",req.body);
    const{name,location,pricePerPerson,climate,culture,rating,description} = req.body;
    if(!name || !location ||!pricePerPerson||!climate ||!culture || !rating){
        res.status(400);
        throw new Error("All fields are mandotory");

    }
    res.status(200).json({message:"create destinations"})
    });


module.exports = {getDestinations,getDestinationById,createDestination};