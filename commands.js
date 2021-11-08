const config = require('./config.json'); // Подключаем файл с параметрами и информацией
const { Client, Intents } = require('discord.js');
const mongoose = require('mongoose')
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] 
  }); 
const prefix = config.prefix; // «Вытаскиваем» префикс
const model = require('./models/model.js')

let arrUserCount = []


var comms_list = [{ // ну список команд, все ясно
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
        const user = new model({
            userTag: msg.author.tag,
            userID: msg.author.id,
            indexInCount: arrUserCount.length - 1
        })
        console.log(user)
        console.log(arrUserCount)
    },
    about: "Команда начинающая процесс чего либо"
}];



module.exports.commands = comms_list;