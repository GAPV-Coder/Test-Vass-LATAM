const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const readFile = require('./routes');

dotenv.config();

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());

// Routes
app.use('/api/v1', readFile);

// Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});