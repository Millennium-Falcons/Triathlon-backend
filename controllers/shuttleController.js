const  asyncHandler = require("express-async-handler");
// @desc Get all destinations
// @route GET /api/destinations


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getShuttles = async (req, res) => {
    try {
    const shuttles = await prisma.shuttle.findMany();
    return res.status(200).json(shuttles);
    } catch (error) {
    console.error('Error fetching shuttles:', error);
    return res.status(500).json({ error: 'Internal server error.' });
    }
};

const getShuttleById = async (req, res) => {
    const shuttleId = parseInt(req.params.id);

    try {
    const shuttle = await prisma.shuttle.findUnique({
        where: { shuttle_id: shuttleId },
    });

    if (!shuttle) {
        return res.status(404).json({ error: 'Shuttle not found.' });
    }

    return res.status(200).json(shuttle);
    } catch (error) {
    console.error('Error fetching shuttle:', error);
    return res.status(500).json({ error: 'Internal server error.' });
    }
};

const createShuttle = async (req, res) => {
        console.log('req body:', req.body);
        const { name, origin, destination, capacity, type, arrivalTime, departureTime } = req.body;
    
        if (!name || !origin || !destination || !arrivalTime || !departureTime || !capacity || !type) {
        return res.status(400).json({ error: 'All fields are mandatory.' });
        }
    
        try {
        const newShuttle = await prisma.shuttle.create({
            data: {
            name,
            origin,
            destination,
            capacity,
            type,
            arrivalTime,
            departureTime,
            },
        });
    
        console.log('New shuttle created:', newShuttle);
        return res.status(201).json({ message: 'Shuttle created successfully.' });
        } catch (error) {
        console.error('Error creating shuttle:', error);
        return res.status(500).json({ error: 'Internal server error.' });
        }
};   

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