// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const vehicleRoutes = require('./routes/vehicle');
const predictRoutes = require('./routes/predict');
const bookingRoutes = require('./routes/book');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/vehicle', vehicleRoutes);
app.use('/predict', predictRoutes);
app.use('/book', bookingRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('AutoCare360 Backend API is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
