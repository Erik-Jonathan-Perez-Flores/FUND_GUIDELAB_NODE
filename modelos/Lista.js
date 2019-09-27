'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Practica = mongoose.model('Practica');
const filesServices = mongoose.model('filesServices');


const ListaSchema = Schema({
    titulo: {
      type: Number,
      require: true
    },
    practica: { 
        type: Schema.ObjectId, 
        ref: Practica 
    },
    archivo: { 
        type: Schema.ObjectId, 
        ref: filesServices 
    }
});

module.exports = mongoose.model('Lista', ListaSchema);