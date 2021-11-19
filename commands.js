const config = require('./config.json'); // Подключаем файл с параметрами и информацией
const { Client, Intents, MessageEmbed } = require('discord.js');
const mongoose = require('mongoose')
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] 
  }); 
const prefix = config.prefix; // «Вытаскиваем» префикс
const modelUser = require('./models/model.js');
const { updateOne } = require('./models/model.js');
const goodChar = config.charGoodActiv // мб символы обозначающие деградацию и развитие поменяю, поэтому вот
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
        if (arguments[1] == goodChar || badChar) {
            let findedUser = await modelUser.findOne({userID: msg.author.id})
            
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
                if (findedUser.typeOfActivity != "404") { // если юзер уже что-то делает
                    msg.channel.send('вы уже что-то делаете');
                    return;
                }

                let updatedUser = {
                    startedTime: Date.now() / 1000 >> 0,
                    typeOfActivity: arguments[1]
                }
                let returnEmbed = new MessageEmbed()
                    .setAuthor(msg.author.username, "https://cdn.discordapp.com/avatars/" + msg.author.id + "/" + msg.author.avatar + ".png")
                    // .setTitle('')
                    .addField('User', `${msg.author.tag}`, true)
                    .addField('IQ', `${findedUser.IQ}`, true)
                    .addField('Coef', `${Math.floor(findedUser.coef / 60)}`, true)
                    .setColor('#ff035f')
                    .setTimestamp();
                    msg.channel.send({ embeds: [returnEmbed] });

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
            msg.channel.send(`Вам нечего заканчивать. Напишите команду {!start ${goodChar} или ${badChar}}`)
        } else {
            let updatedUser = {
                coef: -1,
                typeOfActivity: "404", // 404 не менять!
                IQ: 0
            }
            
            let timeOnActiv = (Date.now() / 1000 >> 0) - findedUser.startedTime
            if(findedUser.typeOfActivity == "g"){ // обновляем коэфицент в 
                updatedUser.coef = await  findedUser.coef + timeOnActiv 
                updatedUser.IQ = Math.floor(updatedUser.coef / 1800) + 95
            } else if(findedUser.typeOfActivity == "b")  {
                updatedUser.coef = await findedUser.coef - timeOnActiv
                updatedUser.IQ = Math.floor(updatedUser.coef / 1800) + 95
            }

            try {
                modelUser.updateOne({_id: findedUser._id}, updatedUser, {upsert: true}, function(err, doc) { // тут мы апдейтим юзера после окончания чего-то(очень понятно да)
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

            let returnEmbed = new MessageEmbed() // ну, эмбед есть ембед. этот с инфой о юзере
                .setAuthor(msg.author.username, "https://cdn.discordapp.com/avatars/" + msg.author.id + "/" + msg.author.avatar + ".png")
                // .setTitle('')
                .addField('User', `${msg.author.tag}`, true)
                .addField('IQ', `${updatedUser.IQ}`, true)
                .addField('Coef', `${Math.floor(updatedUser.coef / 60)}`, true)
                .addField('Time in active', `${Math.floor(Math.abs(updatedUser.coef - findedUser.coef) / 60)}`, true)
                .setColor('#ff035f')
                .setTimestamp();
                msg.channel.send({ embeds: [returnEmbed] });
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