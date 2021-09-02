const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 3000;

dotenv.config({path: './config.env'})

mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('DB connection successful!'))
    .catch(err => console.log(err))

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name!'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price!']
    }
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
    name: 'The Ternopil Lake',
    rating: 1,
    price: 20
})

testTour.save()
    .then(doc => {
        console.log(doc)
    }).catch(err => console.log('Error!', err))

const app = require('./app');
const {mongo} = require("mongoose");
// console.log(process.env);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}...`);
});