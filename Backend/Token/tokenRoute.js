const router = require('express').Router();
const { createAccessToken, stkPush } = require('../Controller/tokenController');

router.post('/', createAccessToken);
router.post('/stk-push', stkPush);

module.exports = router;

// This code defines the routes for the token-related operations in an Express application.
// It imports the necessary modules and defines two routes: one for creating an access token and another for initiating an STK push.
// The routes are linked to their respective controller functions, which handle the logic for each operation.
// The router is then exported for use in the main application file.
// The code sets up an Express router for handling M-Pesa token-related operations.
// It defines two routes: one for creating an access token and another for initiating an STK push.
// The `createAccessToken` function is called when a POST request is made to the root path (`/`),
// while the `stkPush` function is called when a POST request is made to the `/stk-push` path.
// The router is then exported for use in other parts of the application.
