// import express from "express";
// import dotenv from "dotenv";
// import userRoutes from "./routes/userRoutes";
// import { AppDataSource } from "./config/db";

// dotenv.config();

// const app = express();
// app.use(express.json());

// AppDataSource.initialize()
//   .then(() => {
//     console.log("Database connected");

//     app.use("/api/users", userRoutes);

//     const port = process.env.PORT || 3000;
//     app.listen(port, () => console.log(`Server running on port ${port}`));
//   })
//   .catch((error) => console.log("Error connecting to database:", error));
import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import 'reflect-metadata';
import { AppDataSource } from './config/db'; // Database configuration
import router from './routes/userRoutes'; // User routes

dotenv.config(); // Load environment variables

// Initialize the Express app
const app: Application = express();

// Middleware to handle JSON requests
app.use(express.json());

// Enable CORS if needed
app.use(cors());

// Register your routes
app.use('/api', router);

// Database connection and initialization
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
  });

export default app;
