const app = require('./src/app');
const connectDB = require('./src/config/db');
require('dotenv').config();

const PORT = process.env.PORT;


const start = async () => {

    try {
        await connectDB();

    } catch (err) {
        console.error("database connection failed", err.message);
    };

    const server = app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`)
    })
};

start();