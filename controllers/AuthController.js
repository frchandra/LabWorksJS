const crypto = require('crypto');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/AsyncHandlerMiddleware');
const Student = require('../models/Student');

// @desc      Register student
// @route     POST /api/v1/auth/registers
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
    const { name, studentId, batch, email, password, phone, labNum, lab } = req.body;
    // Create student
    const student = await Student.create({
        name,
        studentId,
        batch,
        email,
        password,
        phone,
        labNum,
        lab
    });
    /*
    * create token
    * */
    sendTokenResponse(student, 200, res);
});

// @desc      Login student
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Validate emil & password
    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    // Check for student
    const student = await Student.findOne({ email }).select('+password');

    if (!student) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Check if password matches
    const isMatch = await student.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }
    /*
    * create token
    * */
    sendTokenResponse(student, 200, res);
});

// @desc      Log student out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Public
exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        data: {},
    });
});

// @desc      Get current logged in student
// @route     GET /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
    // student is already available in req due to the protect middleware
    const student = req.student;

    res.status(200).json({
        success: true,
        data: student,
    });
});

// @desc      Update student details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
    const fieldsToUpdate = {
        name: req.body.name,
        email: req.body.email,
    };

    const student = await Student.findByIdAndUpdate(req.student.id, fieldsToUpdate, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        data: student,
    });
});

// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.student.id).select('+password');

    // Check current password
    if (!(await student.matchPassword(req.body.currentPassword))) {
        return next(new ErrorResponse('Password is incorrect', 401));
    }

    student.password = req.body.newPassword;
    await student.save();

    sendTokenResponse(student, 200, res);
});

// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const student = await Student.findOne({ email: req.body.email });

    if (!student) {
        return next(new ErrorResponse('There is no student with that email', 404));
    }

    // Get reset token
    const resetToken = student.getResetPasswordToken();

    await student.save({ validateBeforeSave: false });

    // Create reset url
    const resetUrl = `${req.protocol}://${req.get(
        'host',
    )}/api/v1/auth/resetpassword/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
        await sendEmail({
            email: student.email,
            subject: 'Password reset token',
            message,
        });

        res.status(200).json({ success: true, data: 'Email sent' });
    } catch (err) {
        console.log(err);
        student.resetPasswordToken = undefined;
        student.resetPasswordExpire = undefined;

        await student.save({ validateBeforeSave: false });

        return next(new ErrorResponse('Email could not be sent', 500));
    }
});

// @desc      Reset password
// @route     PUT /api/v1/auth/resetpassword/:resettoken
// @access    Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
    // Get hashed token
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.resettoken)
        .digest('hex');

    const student = await Student.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!student) {
        return next(new ErrorResponse('Invalid token', 400));
    }

    // Set new password
    student.password = req.body.password;
    student.resetPasswordToken = undefined;
    student.resetPasswordExpire = undefined;
    await student.save();

    sendTokenResponse(student, 200, res);
});

/**
 * @desc    Confirm Email
 * @route   GET /api/v1/auth/confirmemail
 * @access  Public
 */
exports.confirmEmail = asyncHandler(async (req, res, next) => {
    // grab token from email
    const { token } = req.query;

    if (!token) {
        return next(new ErrorResponse('Invalid Token', 400));
    }

    const splitToken = token.split('.')[0];
    const confirmEmailToken = crypto
        .createHash('sha256')
        .update(splitToken)
        .digest('hex');

    // get student by token
    const student = await Student.findOne({
        confirmEmailToken,
        isEmailConfirmed: false,
    });

    if (!student) {
        return next(new ErrorResponse('Invalid Token', 400));
    }

    // update confirmed to true
    student.confirmEmailToken = undefined;
    student.isEmailConfirmed = true;

    // save
    student.save({ validateBeforeSave: false });

    // return token
    sendTokenResponse(student, 200, res);
});

//   from model, create cookie and send response
const sendTokenResponse = (student, statusCode, res) => {
    // Create token
    const token = student.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
    });
};

