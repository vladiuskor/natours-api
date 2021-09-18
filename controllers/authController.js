const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = id => {
    return jwt.sign({id: id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}


const signUp = catchAsync(async (req, res, next) => {

    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
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
    console.log(token)

    if(!token) {
        return next(new AppError('You  are not logged in! Please log in to get access.', 401))
    }

    // 2) Verification token

    // 3) Check if user still exist

    // 4) Check if user change password after the token was issued

    next();
});

module.exports = {
    signUp,
    logIn,
    protect
}