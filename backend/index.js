const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const supplySchema = require('./models/SupplySchema');
const DBConfig = require('./config/db');
const inventroyRoutes = require('./routes/InventroyRoutes');

DBConfig();




dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use('/api/inventory',inventroyRoutes);

// Connect to MongoDB


// Basic Route
app.get('/', (req, res) => {
    res.send('Server is running...');
});

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
