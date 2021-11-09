const { UserFlags } = require('discord.js');
const mongoose = require('mongoose')
const config = require('./config.json')

const fuck = require('./models/model.js')



mongoose.connect(config.mongoDB);

// const kittySchema = new mongoose.Schema({
//     name: String
// });

// const Kitten = mongoose.model('Kitten', kittySchema);

// const fluffy = new Kitten({ name: 'fluffy' });  
// fluffy.save();


// const kittens = Kitten.find();
// console.log(kittens, fluffy);

fuck.find({ name: "Vulduk#7105" })





