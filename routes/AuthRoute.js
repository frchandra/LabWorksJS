const express = require('express');
const expressRouter = express.Router();
const {
    register,
    login,
    logout,
    getMe,
    updateDetails,
    updatePassword,
} = require('../controllers/AuthController');



// const { protect } = require('../middleware/auth');

expressRouter.post('/register', register);
expressRouter.post('/login', login);
expressRouter.get('/logout', logout);
// expressRouter.get('/me', protect, getMe);
// expressRouter.put('/updatedetails', protect, updateDetails);
// expressRouter.put('/updatepassword', protect, updatePassword);


module.exports = expressRouter;