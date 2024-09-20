import app from './app'; // Import the Express app
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Set the port, default to 3000 if not specified in the environment variables
const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
