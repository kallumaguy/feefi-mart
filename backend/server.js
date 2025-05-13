import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

// App Config
const app = express();
const PORT = process.env.PORT || 4000;
connectDB()
connectCloudinary()

// Middleware
app.use(express.json());
app.use(cors());

// API endpoints
app.get('/', (req, res) => {
  res.send( 'Feefi Mart API working!' );
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});