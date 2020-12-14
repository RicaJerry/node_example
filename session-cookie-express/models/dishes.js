const { Mongoose } = require("mongoose");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DishSchema = new Schema({

    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }

}, {
    timestamps: true
});

var Dishes = mongoose.model('Dish', DishSchema);

module.exports = Dishes;