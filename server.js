'use strict';
/** 3rd party packages */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');

/** models */
const User = require('./models/User');

/** start server and connect to mongodb */
const app = express();

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
.then(() => {
    console.log('Mongoose is now connected!');
})
.catch(err => console.error(`There was an error: ${err}`));

/** create application/json parser */
const jsonParser = bodyParser.json();

/** create application/x-www-form-urlencoded parser */
const urlencodedParser = bodyParser.urlencoded({ extended: false });


const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.post('/register', jsonParser, [
    check('username')
    .isAlpha()
    .withMessage('Must be only alphabetical characters')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
    check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
    check('confirmPassword', 'confirmPassword field must have the same value as the password field')
    .custom((value, { req }) => value === req.body.password)
], (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    
    // create and save new user
    const newUser = new User(req.body);
    newUser.save()
    .then(result => {
        console.log('result of save -> ', result);
        res.status(200).json({ success: true, result});
    })
    .catch(err => {
        console.error('There was an error when trying to save the new user: ', err);
        res.status(500).json({ error: err })
    })
});

app.post('/login', jsonParser, (req, res) => {

});

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));