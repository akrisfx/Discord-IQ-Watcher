const config = require('./config.json'); // Подключаем файл с параметрами и информацией
const { Client, Intents } = require('discord.js');
const mongoose = require('mongoose')
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] 
  }); 
const prefix = config.prefix; // «Вытаскиваем» префикс
const modelUser = require('./models/model.js')

let comms_list = [{ // ну список команд, все ясно
    name: prefix + "test",
    out: (msg, arg) => {
        msg.channel.send(`test! ${arg.slice(1)}`)
    },
    about: "Тестовая команда"
}, {
    name: prefix + "start", // Команда начинающая процесс чего либо 
    out: async (msg, arguments) => {
        const user = new modelUser({
            userTag: msg.author.tag,
            userID: msg.author.id,
            startedTime: Date.now() / 1000 >> 0,
            typeOfActivity: arguments[1]
        });
        try{
            user.save();
        } catch { error => {console.log(error)} };
        // console.log(user)
        // console.log(arrUserCount)
    },
    about: "Команда начинающая процесс чего либо"
}, {
    name: prefix + "end", // команда обозначает что ты закончил последний процесс
    out: async (msg, arguments) => {
        const findedUser = await modelUser.findOne({userID: msg.author.id}) // ищем юзера написавшего сообщение по его ID в дискорде
        if(findedUser == null) { // findUser будет нулём если юзера не нашло
            msg.channel.send("Вам нечего заканчивать. Напишите команду {!start + или -}")
        } else {
            
        }
                                 
    }
}, {
    name: prefix + "deleteall",
    out: async (msg, arguments = 0) => { // функция очистки базы данных, доступная конечно же только мне
        if ( msg.author.tag == "Vulduk#7105" ) {
            modelUser.deleteMany({}, (error) => {
                console.log("data base was cleaned");
                if (error != null) { console.log(error)};
            });
        };
    }
}];




module.exports.commands = comms_list;