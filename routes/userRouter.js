const express = require("express");
const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
} = require('./../controllers/userController');
const {
    signUp,
    logIn,
    protect,
    forgotPassword,
    resetPassword,
    updatePassword
} = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', logIn);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router.patch('/updateMyPassword', protect, updatePassword);

router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.route('/:id')
    .get(getOneUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = router;
