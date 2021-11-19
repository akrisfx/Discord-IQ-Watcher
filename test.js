const { UserFlags } = require('discord.js');
const mongoose = require('mongoose')
const config = require('./config.json')

const model = require('./models/model.js')
const user = new model({name: "wawe"})


const aaa = {
    o: (async (args) => {
        const fmodel =  await model.find()
        console.log(fmodel, args)
    })
}

// aaa.o()

const dateNow = Date.now()
console.log(typeof(dateNow))

const connect = mongoose.connect(config.mongoDB)

async function foo() {
    const e =  await model.findOne({IQ: 4})
    await console.log(e)
}
foo()


// mongoose.disconnect()


// const kittySchema = new mongoose.Schema({
//     name: String
// });

// const Kitten = mongoose.model('Kitten', kittySchema);

// const fluffy = new Kitten({ name: 'fluffy' });  
// fluffy.save();


// const kittens = Kitten.find();
// console.log(kittens, fluffy);

// aaa.o({name: 'lox'})

// const user = new model({
//     userTag: '',
//     userID: msg.author.id,
//     indexInCount: arrUserCount.length - 1
// })


// fu()
// fmodel.exec(function(err, fmodel){
//     if (err) return handleError(err);
//     for( let i = 0; i < fmodel.length; i++){
//         console.log(fmodel)
//     }
// })




