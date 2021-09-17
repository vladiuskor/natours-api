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
    logIn
} = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', logIn);

router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.route('/:id')
    .get(getOneUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = router;
