


>>>This project defines functions to generate an M-Pesa access token and initiate an STK Push transaction using Safaricom's API with secure credential handling and input validation.
It leverages axios for HTTP requests, dotenv for environment management, and includes robust error handling and logging for debugging and reliability.


                       MORE SPECIFIC INFORMATION BELOW
NOTE: This works, and is for education purpose

just pull and npm i 
use postmn or anything else to test end points


//Consider using your own ports eg, 3000, 4000, 5000 etc
endpoints:  
 To create a token: http://localhost:4000/api/token/
To do a payment request: http://localhost:4000/api/token/stk-push


// The `createAccessToken` function retrieves an access token from the M-Pesa API using credentials stored in environment variables.
// The `stkPush` function initiates a payment request using the access token, amount, and phone number provided in the request body.
// It validates the input, formats the phone number, and constructs the necessary data for the STK push request.
// The code also includes error handling to manage potential issues during the API calls.
// The `createAccessToken` function is used to generate an access token for M-Pesa API requests.
// The `stkPush` function is used to initiate a payment request using the M-Pesa API.
// The code includes error handling to manage potential issues during the API calls.
// The code uses the `axios` library to make HTTP requests to the M-Pesa API.
// The code uses environment variables to store sensitive information such as consumer keys, secret keys, and URLs.
// The code uses the `dotenv` package to load environment variables from a `.env` file.
// The code uses the `Buffer` class to encode the consumer key and secret key for authentication.
// The code uses the `global` object to store the access token for use in subsequent requests.
// The code uses the `Date` object to generate a timestamp for the STK push request.
// The code uses the `padStart` method to format the timestamp components to ensure they are two digits long.
// The code uses the `startsWith` method to validate the phone number format.
// The code uses the `trim` method to remove whitespace from the phone number.
// The code uses the `slice` method to manipulate the phone number string.
// The code uses the `console.log` method to log messages for debugging purposes.


