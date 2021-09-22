const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Global uncaught exceptions EXAMPLES
process.on('uncaughtException', err => {
    console.log('Uncaught Exception!!! Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    })
})


dotenv.config({path: './config.env'});
const app = require('./app');


mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('DB connection successful!'))
    .catch(err => console.log(err))



const PORT = process.env.PORT || 3000;
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

