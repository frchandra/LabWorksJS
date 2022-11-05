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



const { protect } = require('../middleware/AuthMiddleware');

expressRouter.post('/register', register);
expressRouter.post('/login', login);
expressRouter.get('/logout', protect, logout);
expressRouter.get('/me', protect, getMe);
// expressRouter.put('/updatedetails', protect, updateDetails);
// expressRouter.put('/updatepassword', protect, updatePassword);


module.exports = expressRouter;