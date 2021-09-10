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


// BUILD QUERY  Simple way without Class

// 1-a) Filtering

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


// =======================================================
// const queryObj = {...req.query};
// const excludedFields = ['page', 'sort', 'limit', 'fields'];
//
// excludedFields.forEach( elem => delete queryObj[elem]);
// // 1-b) Advanced filtering
// let queryStr = JSON.stringify(queryObj);
// // gte, gt, lte, lt
// queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
//
// let query =  Tour.find(JSON.parse(queryStr));
// =======================================================


// 2) Sorting data
// =======================================================
// if(req.query.sort) {
//     const sortBy = req.query.sort.split(',').join(' ');
//     console.log(sortBy);
//     query = query.sort(sortBy);
// } else {
//     query = query.sort('-createdAt');
// }
// =======================================================


// 3) Field limiting
// =======================================================
// if(req.query.fields) {
//     const fields = req.query.fields.split(',').join(' ');
//     query = query.select(fields);
// } else {
//     query = query.select('-__v');
// }
// =======================================================

// 4) Pagination
// =======================================================
// const page = req.query.page * 1 || 1;
// const limit = req.query.limit * 1 || 100;
// const skip = (page - 1) * limit;
// // page=2&limit=10, 1-10, page 1, 11-20, page 2
// query = query.skip(skip).limit(limit);
//
// if(req.query.page) {
//     const numTours = await Tour.countDocuments();
//
//     if(skip >= numTours) {
//         throw new Error('This page does not exist!')
//     }
// }
// =======================================================
// EXECUTE QUERY
// const tours = await query;