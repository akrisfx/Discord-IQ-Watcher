const config = require('./config.json'); // Подключаем файл с параметрами и информацией
const { Client, Intents } = require('discord.js');
const mongoose = require('mongoose')
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] 
  }); 
const prefix = config.prefix; // «Вытаскиваем» префикс
const modelUser = require('./models/model.js');
const { updateOne } = require('./models/model.js');
const goodChar = config.charGoodActiv
const badChar = config.charBadActiv

let comms_list = [{ // ну список команд, все ясно
    name: prefix + "test",
    out: (msg, arg) => {
        msg.channel.send(`test! ${arg.slice(1)}`)
    },
    about: "Тестовая команда"
}, {
    name: prefix + "start", // Команда начинающая процесс чего либо 
    out: async (msg, arguments) => {
        if (arguments[1] == 'g' || 'b') {
            let findedUser = await modelUser.findOne({userID: msg.author.id})
            console.log(findedUser, msg.author.id)
            if (findedUser == null){
                const user = new modelUser({
                    userTag: msg.author.tag,
                    userID: msg.author.id,
                    startedTime: Date.now() / 1000 >> 0,
                    typeOfActivity: arguments[1]
                });
                try{
                    user.save(); // сохраняем нового
                } catch { error => {console.log(error)} };
            } else {
                let updatedUser = {
                    startedTime: Date.now() / 1000 >> 0,
                    typeOfActivity: arguments[1]
                }
                modelUser.updateOne({_id: findedUser._id}, updatedUser, {upsert: true}, function(err, doc) { // апдейтим существующего юзера
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log('Succesfully saved.');
                    return 0;
                });
            }
            
            
            // console.log(user)
            // console.log(arrUserCount)
        } else {
            msg.channel.send("Не тот аргумент");
            return;
        }
    },
    about: "Команда начинающая процесс чего либо"
}, {
    name: prefix + "end", // команда обозначает что ты закончил последний процесс
    out: async (msg, arguments) => {
        let findedUser = await modelUser.findOne({userID: msg.author.id}) // ищем юзера написавшего сообщение по его ID в дискорде
        if(findedUser == null) { // findUser будет нулём если юзера не нашло
            msg.channel.send("Вам нечего заканчивать. Напишите команду {!start + или -}")
        } else {
            let updatedUser = {
                coef: 4040404040404,
                typeOfActivity: "404"
            }
            
            let timeOnActiv = (Date.now() / 1000 >> 0) - findedUser.startedTime
            console.log(findedUser.startedTime)
            console.log(timeOnActiv)
            if(findedUser.typeOfActivity == "g"){
                updatedUser.coef = findedUser.coef + timeOnActiv
            } else if(findedUser.typeOfActivity == "b")  {
                updatedUser.coef = findedUser.coef - timeOnActiv
            }
            console.log(updatedUser)
            try {
                modelUser.updateOne({_id: findedUser._id}, updatedUser, {upsert: true}, function(err, doc) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log('Succesfully saved.');
                    return 0;
                });
            } catch {
            err => {console.log(err)}
            }      
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