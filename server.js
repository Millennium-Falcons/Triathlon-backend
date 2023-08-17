const express = require("express");
const dotenv= require("dotenv").config();
const app = express();
const port=process.env.PORT || 5000;

app.use(express.json());
app.use("/api/destinations",require("./routes/destinationRoutes"));

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});