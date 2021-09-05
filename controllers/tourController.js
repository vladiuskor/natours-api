const Tour = require('./../models/tourModel');

// const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json', 'utf-8'));

// const checkId = (req, res, next, val) => {
// console.log(`Tour id is: ${val}`);
// if (parseInt(req.params.id) > tours.length) {
//     return res.status(404).json({
//         status: 'Fail',
//         message: 'Invalid id'
//     });
// }

// next();
// }

const getAllTours = async (req, res) => {

    try {
        //Build query
        const queryObj = {...req.query};
        const excludedFields = ['page', 'sort', 'limit', 'fields'];

        excludedFields.forEach( elem => delete queryObj[elem]);
        console.log(req.query, queryObj)

        const query =  Tour.find(queryObj);
        // Execute query
        const tours = await query;

        // Filtering. Method 1 (hardcode)
        // ===========================
        // const tours = Tour.find({
        //     duration: 5,
        //     difficulty: 'easy'
        // });


        // Filtering. Method 2
        // ===========================
        // const tours = Tour.find()
        //     .where('duration')
        //     .equals(5)
        //     .where('difficulty')
        //     .equals('easy')


        //Send response
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: {
                err
            }
        })
    }


}

const getTour = async (req, res) => {

    try {
        const tour = await Tour.findById(req.params.id)
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: {
                err
            }
        })
    }
}

const createTour = async (req, res) => {

    try {
        // const newTour = new Tour ({});
        // newTour.save()
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: {
                err,
                error_text: err.errmsg
            }
        })
    }


}

const updateTour = async (req, res) => {

    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: {
                err
            }
        })
    }

}

const deleteTour = async (req, res) => {

    try {
        await Tour.findByIdAndDelete(req.params.id)

        res.status(204).json({
            status: 'success',
            data: null
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: {
                err
            }
        })
    }
}

module.exports = {
    getAllTours,
    getTour,
    createTour,
    updateTour,
    deleteTour,
}