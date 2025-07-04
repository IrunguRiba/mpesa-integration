const axios = require('axios');
require('dotenv').config();

/**
 * Generate M-Pesa OAuth Access Token
 */
const createAccessToken = async (req, res) => {
    const consumerKey = process.env.CONSUMER_KEY;
    const consumerSecret = process.env.CONSUMER_SECRET;

    if (!consumerKey || !consumerSecret) {
        return res.status(500).json({
            message: "Missing CONSUMER_KEY or CONSUMER_SECRET in environment variables"
        });
    }

    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    try {
        const response = await axios.get(
            'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
            {
                headers: {
                    Authorization: `Basic ${auth}`,
                },
            }
        );

        const accessToken = response.data.access_token;
        const expiresIn = response.data.expires_in;

        global.accessToken = accessToken;

        console.log("Access Token:", accessToken);
    

        res.status(200).json({
            message: "Access token created successfully",
            accessToken,
            expiresIn,
        });

    } catch (error) {
        console.error("Error creating access token:", error.response?.data || error.message);
        res.status(500).json({
            message: "Error creating access token",
            error: error.response?.data || error.message,
        });
    }
};

/**
 * Method to Initiate the STK Push
 */
const stkPush = async (req, res) => {
    const { amount, phone } = req.body;
    const shortCode = process.env.SHORTCODE;
    const passKey = process.env.PASSKEY;
    const url = process.env.STK_URL;
    const accessToken = global.accessToken;

    // This loop Validates input
    if (!accessToken) {
        return res.status(401).json({ message: "Access token not available. Call /api/token first." });
    }

    if (!amount || !phone) {
        return res.status(400).json({ message: "Phone and amount are required." });
    }

    //To make sure the input Convert phone to MSISDN format (2547XXXXXXXX)
    let cleanPhone = phone.trim();
    if (cleanPhone.startsWith('+')) {
        cleanPhone = cleanPhone.slice(1);
    } else if (cleanPhone.startsWith('0')) {
        cleanPhone = '254' + cleanPhone.slice(1);
    } else if (!cleanPhone.startsWith('254')) {
        return res.status(400).json({ message: "Phone number must start with '0' or '+254'" });
    }

    // Method to Generate timestamp in YYYYMMDDHHMMSS format
    const date = new Date();
const timestamp = date.getFullYear().toString() +
  String(date.getMonth() + 1).padStart(2, '0') +
  String(date.getDate()).padStart(2, '0') +
  String(date.getHours()).padStart(2, '0') +
  String(date.getMinutes()).padStart(2, '0') +
  String(date.getSeconds()).padStart(2, '0');

  const password = Buffer.from(shortCode + passKey + timestamp).toString('base64');

    const data = {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: cleanPhone,
        PartyB: shortCode,
        PhoneNumber: cleanPhone,
        CallBackURL: "https://mydomain.com/path",
        AccountReference: "Mpesa Integration Test",
        TransactionDesc: "Testing stk push",
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        console.log("✅ STK Push Response:", response.data);

        res.status(200).json({
            message: "STK Push initiated successfully",
            data: response.data,
        });

    } catch (error) {
        console.error("STK Push Error:", error.response?.data || error.message);
        res.status(500).json({
            message: "Error initiating STK Push",
            error: error.response?.data || error.message,
        });
    }
};

module.exports = {
    createAccessToken,
    stkPush
};

                             /* THESE ARE SOME NOTES */

// This code defines two functions for handling M-Pesa access token generation and STK push initiation.
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
