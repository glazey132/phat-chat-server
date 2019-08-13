'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const UserModel = require('./models/User');

const app = express();
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
.then(() => {
    console.log('Mongoose is now connected!');
})
.catch(err => console.error(`There was an error: ${err}`));

// create application/json parser
const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });


const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.post('/register', jsonParser, (req, res) => {
    console.log('req.body => ', req.body);
    // const { username, password } = req.body;
    // console.log("TCL: password", password);
    // console.log("TCL: username", username);
})

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));