const dotenv = require('dotenv');
const PORT = process.env.PORT || 3000;

dotenv.config({path:'./config.env'})

const app = require('./app');
// console.log(process.env);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}...`);
});