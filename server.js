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


const app = require('./app');

const server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}...`);
});

//Global unhandled rejections EXAMPLES
process.on('unhandledRejection', err => {
    console.log('Unhandled Rejection!!! Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    })
});

//Global uncaught exceptions EXAMPLES
process.on('uncaughtException', err => {
    console.log('Uncaught Exception!!! Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    })
})
