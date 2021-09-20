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
    forgotPassword,
    resetPassword
} = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', logIn);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);

router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.route('/:id')
    .get(getOneUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = router;
