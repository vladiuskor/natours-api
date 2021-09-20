const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const {raw} = require("express");

const signToken = id => {
    return jwt.sign({id: id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}


const signUp = catchAsync(async (req, res, next) => {

    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        passwordChangedAt: req.body.passwordChangedAt
    });

    const token = signToken(newUser.id)

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    });
});

const logIn = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }
    // 2) Check if user exist && password is correct
    const user = await User.findOne({email: email}).select('+password');

    if (!user || !await user.correctPassword(password, user.password)) {
        return next(new AppError('Incorrect email or password!', 401));
    }
    // 3) If everything is OK< send token to the client
    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        token
    });
});

const protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check of it`s there
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('You  are not logged in! Please log in to get access.', 401));
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exist
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError('The user belonging to this token does no longer exist!', 401));
    }

    // 4) Check if user change password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('User recently changed password! Please log in again!', 401));
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
});

const restrictTo = (...roles) => {
    return (req, res, next) => {
        //    roles ['admin', 'lead-guide'] is an array. role ='user'
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403))
        }

        next();
    }
}

const forgotPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on POSTed email
    const user = await User.findOne({email: req.body.email});
    if(!user) {
        return next(new AppError('There is no user with email address.', 404));
    }
    // 2) Generate the random token
    const resetToken = user.createPasswordResetToken();
    await user.save({validateBeforeSave: false});
    // 3) Send it to user's email
});

const resetPassword = (req, res, next) => {

}

module.exports = {
    signUp,
    logIn,
    protect,
    restrictTo,
    forgotPassword,
    resetPassword
}
