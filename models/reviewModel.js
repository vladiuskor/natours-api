const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        trim: true,
        required: [true, 'Review can not be empty!']
    },
    rating: {
        type: Number,
        // required: [true, 'Review must have a rating!'],
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0']
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        // select: false
    },
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, 'Review must belong to a tour!']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user!']
    }
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;