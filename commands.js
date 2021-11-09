const config = require('./config.json'); // Подключаем файл с параметрами и информацией
const { Client, Intents } = require('discord.js');
const mongoose = require('mongoose')
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] 
  }); 
const prefix = config.prefix; // «Вытаскиваем» префикс
const modelUser = require('./models/model.js')

let arrUserCount = []


let comms_list = [{ // ну список команд, все ясно
    name: prefix + "test",
    out: (msg, arg) => {
        msg.channel.send(`test! ${arg.slice(1)}`)
    },
    about: "Тестовая команда"
}, 
{
    name: prefix + "start", // Команда начинающая процесс чего либо 
    out: (msg, arguments) => {
        arrUserCount.push(0)
        const user = new modelUser({
            userTag: msg.author.tag,
            userID: msg.author.id,
            indexInCount: arrUserCount.length - 1
        })
        try{
            user.save()
        } catch { error => {console.log(error)} }
        // console.log(user)
        // console.log(arrUserCount)
        
        
    },
    about: "Команда начинающая процесс чего либо"
}];
const kittens = modelUser.find().exec();
console.log('-------------------------', kittens ,'-------------------------');



module.exports.commands = comms_list;