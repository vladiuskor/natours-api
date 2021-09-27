const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');
const User = require('./../../models/userModel');
const Review = require('./../../models/reviewModel');

dotenv.config({path: './config.env'})

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('DB connection successful!'))
    .catch(err => console.log(err))

// Read JSON-file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));

// Import data to DB
const importData =  async () => {
   try {
       await Tour.create(tours);
       await User.create(users, {validateBeforeSave: false});
       await Review.create(reviews);

       console.log('Data successfully loaded!');
       process.exit(); /*Don't use process.exit() in big projects!!! Only for small scripts!!! */
   }  catch (err) {
       console.log(err)
   }
}

//Delete all documents from collection
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        await User.deleteMany();
        await Review.deleteMany();
        console.log('Data successfully deleted!');
        process.exit(); /*Don't use process.exit() in big projects!!! Only for small scripts!!! */
    }  catch (err) {
        console.log(err)
    }
}

if(process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
} else {
    console.log('Please, enter correct command!');
}

console.log(process.argv)