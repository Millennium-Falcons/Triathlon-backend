const  asyncHandler = require("express-async-handler");

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// @desc Get all destinations
// @route GET /api/destinations
const getDestinations = async (req, res) => {
    try {
      const destinations = await prisma.destination.findMany();
      return res.status(200).json(destinations);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  };


  const getDestinationById = async (req, res) => {
    const destinationId = parseInt(req.params.id);
  
    try {
      const destination = await prisma.destination.findUnique({
        where: { destination_id: destinationId },
      });
  
      if (!destination) {
        return res.status(404).json({ error: 'Destination not found.' });
      }
  
      return res.status(200).json(destination);
    } catch (error) {
      console.error('Error fetching destination:', error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  };

    const createDestination = async (req, res) => {
      console.log('req body:', req.body);
      const { name, location, pricePerPerson, climate, culture, rating, description } = req.body;
    
      if (!name || !location || !pricePerPerson || !climate || !culture || !rating) {
        return res.status(400).json({ error: 'All fields are mandatory.' });
      }
    
      try {
        const newDestination = await prisma.destination.create({
          data: {
            name,
            location,
            pricePerPerson,
            climate,
            culture,
            rating,
            description,
          },
        });
    
        console.log('New destination created:', newDestination);
        return res.status(201).json({ message: 'Destination created successfully.' });
      } catch (error) {
        console.error('Error creating destination:', error);
        return res.status(500).json({ error: 'Internal server error.' });
      }
    };
    
  

module.exports = {getDestinations,getDestinationById,createDestination};