const fs = require('fs');
const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json', 'utf-8'));

const checkId = (req, res, next, val) => {
    console.log(`Tour id is: ${val}`);
    if (parseInt(req.params.id) > tours.length) {
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid id'
        });
    }

    next();
}

const checkBody = (req, res, next) => {
    if(!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message: 'missing name or price'
        })
    }
    next()
}

const getAllTours = (req, res) => {
    console.log(req.requestTime)
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
}

const getTour = (req, res) => {
    console.log(req.params);

    const id = parseInt(req.params.id);

    const tour = tours.find(el => el.id === id);

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
}

const createTour = (req, res) => {
    // console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
        res.status(201).json({
            status: 'Success',
            data: {
                tour: newTour
            }
        });
    });
}

const updateTour = (req, res) => {

    res.status(200).json({
        status: 'Success',
        data: {
            tour: '<Updated tour here>'
        }
    })
}

const deleteTour = (req, res) => {

    res.status(204).json({
        status: 'Success',
        data: null
    })
}

module.exports = {
    getAllTours,
    getTour,
    createTour,
    updateTour,
    deleteTour,
    checkId,
    checkBody
}