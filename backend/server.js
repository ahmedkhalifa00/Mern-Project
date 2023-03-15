const path = require('path');
const express = require('express');
const db =require('./metier/singeltonConnection');
const bodyParser = require('body-parser');
const colors = require('colors');
const dotenv = require('dotenv').config();
const{errorHandler} = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());

app.use('/api/offres', require('./routes/offreRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

