const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');
const disRouter = express.Router();

disRouter.use(bodyParser.json());

disRouter.route('/')
.get((req, res, next) => {
    Dishes.find({})
    .then((dishes)=> {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dishes);          
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((req, res, next)=>{
    Dishes.create(req.body)
    .then((dish) => {
        console.log('Dish created');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'applicaiton/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err))

})

module.exports = disRouter;