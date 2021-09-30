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

router.get('/', viewController.getOverview);
router.get('/tour/:slug', authController.protect, viewController.getTour);
router.get('/login', viewController.getLoginPage);

module.exports = router;
