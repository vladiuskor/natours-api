const mongoose = require('mongoose');
const Tour = require('./models/tourModel');
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


// const testTour = new Tour({
//     name: 'The Ternopil Lake',
//     rating: 1,
//     price: 20
// })

// testTour.save()
//     .then(doc => {
//         console.log(doc)
//     }).catch(err => console.log('Error!', err))

const app = require('./app');
// console.log(process.env);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}...`);
});