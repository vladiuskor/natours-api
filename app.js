const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.json());

// app.get('/', (req, res) => {
//     // res.status(200).send('Hello from the server-side!');
//     res
//         .status(200)
//         .json({message: 'Hello from the server-side!', app: 'natours'});
// });
//
// app.post('/', (req, res) => {
//     res.send('You can post to this endpoint!')
// })
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'));

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
});

app.get('/api/v1/tours/:id', (req, res) => {
    console.log(req.params);

    const id = parseInt(req.params.id);

    if (id > tours.length) {
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid id'
        });
    }

    const tour = tours.find(el => el.id === id);

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
});

app.post('/api/v1/tours', (req, res) => {
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
});

app.patch('/api/v1/tours/:id', (req, res) => {
    if (parseInt(req.params.id) > tours.length)  {
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid id'
        });
    }


    res.status(200).json({
        status: 'Success',
        data: {
            tour: '<Updated tour here>'
        }
    })
});

app.delete('/api/v1/tours/:id', (req, res) => {
    if (parseInt(req.params.id) > tours.length)  {
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid id'
        });
    }


    res.status(204).json({
        status: 'Success',
        data: null
    })
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}...`);
});