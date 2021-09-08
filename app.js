const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

const app = express();

// Middlewares
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// Simple example of middleware
// app.use((req, res, next) => {
//     console.log('Hello from the middleware!');
//     next();
// });

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

// app.use(express.static(`${__dirname}/public`))

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


app.all('*', (req, res, next) => {
   // res.status(404).json({
   //     status: 'fail',
   //     message: `Can't find ${req.originalUrl} on this server.`
   // })

    const err = new Error(`Can't find ${req.originalUrl} on this server.`);
    err.status = 'fail';
    err.statusCode = 404;
    next(err);
});

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
})

module.exports = app;