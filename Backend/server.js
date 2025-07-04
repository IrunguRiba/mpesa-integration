const express= require("express");

const router = require('./Token/tokenRoute');
// This code sets up a basic Express server for an M-Pesa integration application.
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/token', router);

app.get('/api', (req, res) => {
    res.json({ message: "This is an mpesa integration app in Real Time Example" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// This code initializes an Express server that listens on a specified port (default is 3000).
// It sets up a JSON parser middleware to handle incoming JSON requests.

// The server has a base route (`/api`) that returns a simple JSON message indicating that it is an M-Pesa integration app.
// Additionally, it uses a router for handling token-related operations under the `/api/token` path.
// The server logs a message to the console when it starts, indicating the port on which it is running.
// The code imports the Express framework and the router for handling token-related operations.
// It initializes an Express application, sets the port, and configures middleware to parse JSON requests.
// The server listens on the specified port and responds to a base route with a message indicating that it is an M-Pesa integration app.
// The router is mounted at the `/api/token` path, allowing for token-related operations to be handled by the imported router.
// The code sets up an Express server for an M-Pesa integration application.
// It imports the necessary modules, initializes the server, and sets up routes for token operations.
// The server listens on a specified port and responds to a base route with a message indicating the purpose of the application.
// The server is configured to handle JSON requests and uses a router for token-related operations.
// The code imports the Express framework and the router for handling token-related operations.

// It initializes an Express application, sets the port, and configures middleware to parse JSON requests.
// The server listens on the specified port and responds to a base route with a message indicating that it is an M-Pesa integration app.
// The router is mounted at the `/api/token` path, allowing for token-related operations to be handled by the imported router.
// The code sets up an Express server for an M-Pesa integration application.

// It imports the necessary modules, initializes the server, and sets up routes for token operations.


// The server listens on a specified port and responds to a base route with a message indicating the purpose of the application.

//DON'T WORRY, THESE NOTE ARE GENEATED BY AI AND ARE NOT PART OF THE CODE 😂😂😂
