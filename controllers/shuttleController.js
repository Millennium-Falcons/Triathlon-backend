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




const addPassenger = asyncHandler(async (req, res) => {
    console.log("req body:", req.body);
    const { name, email, gender, phone, location } = req.body;

    // Check if the required fields are provided in the request body
    if (!name || !email || !gender || !phone || !location) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    try {
        const shuttleId = parseInt(req.params.id, 10);
        const bookingId = parseInt(req.params.bId, 10); // Convert shuttleId to an integer

        // Create a new passenger record and connect it to the specified shuttle
        const createdPassenger = await prisma.passenger.create({
            data: {
                name,
                email, 
                gender,
                phone,
                location,
                shuttleId ,
                bookingId,
            }
        });

        res.status(200).json({ message: "Passenger added successfully", passenger: createdPassenger });
    } catch (error) {
        console.error("Error adding passenger:", error);
        res.status(500).json({ message: "Failed to add passenger" });
    }
});

//testing
//Get Seat Locations
const getLocationsByShuttleId = asyncHandler(async (req, res) => {
    const shuttleId = parseInt(req.params.shuttleId);
  
    try {
      const locations = await prisma.passenger.findMany({
        where: {
          shuttleId,
        },
        select: {
          location: true,
        },
      });
  
      const locationArray = locations.map((passenger) => passenger.location);
  
      return res.status(200).json(locationArray);
    } catch (error) {
      console.error("Error fetching locations:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  });

  //testing searching for shuttles
  const getShuttlesByCriteria = asyncHandler(async (req, res) => {
    const { origin, destination, time } = req.params;

    try {
        const shuttles = await prisma.shuttle.findMany({
            where: {
                origin: origin,
                destination: destination,
                arrivalTime: {
                    lte: new Date(time)
                },
                departureTime: {
                    gte: new Date(time)
                }
            }
        });

        res.status(200).json(shuttles);
    } catch (error) {
        console.error('Error fetching shuttles:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

//testing save booking record

const saveBookingRecord = asyncHandler(async (req, res) => {
    const { bookingId } = req.params;


    try {
        // Retrieve passengers with the given bookingId
        const passengers = await prisma.passenger.findMany({
            where: {
                bookingId: parseInt(bookingId),
            },
        });

        // Calculate total cost based on shuttle type and number of passengers
        let totalCost = 0;
        for (const passenger of passengers) {
            const shuttle = await prisma.shuttle.findUnique({
                where: { shuttle_id: passenger.shuttleId },
            });
            console.log(shuttle);


            const costPerPassenger = shuttle.type === 'economy' ? 1000 : 2000;
            totalCost += costPerPassenger;
        }

        // Create a new booking record in bookingTBL
        const newBookingRecord = await prisma.bookingTBL.create({
            data: {
                bookingId: parseInt(bookingId),
                number_of_passengers: passengers.length,
                Total_cost: totalCost,
            },
        });

        res.status(201).json({ message: 'Booking record saved successfully', bookingRecord: newBookingRecord });
    } catch (error) {
        console.error('Error saving booking record:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




module.exports = {getShuttles,getShuttleById,createShuttle,addPassenger,getLocationsByShuttleId,getShuttlesByCriteria,saveBookingRecord};