const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');
const router = express.Router();

// router.get('/', (req, res) => {
//     res.status(200).render('base', {
//         tour: 'The Forest Hiker',
//         user: 'Jonas'
//     });
// });
router.get('/', authController.isLoggedIn, viewController.getOverview);
router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);
router.get('/login', authController.isLoggedIn, viewController.getLoginPage);
router.get('/me', authController.protect, viewController.getAccount);

router.post('/submit-user-data', authController.protect, viewController.updateUserData)

module.exports = router;
