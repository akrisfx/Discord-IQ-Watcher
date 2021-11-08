const config = require('./config.json'); // Подключаем файл с параметрами и информацией
const { Client, Intents } = require('discord.js');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
  });
const prefix = config.prefix; // «Вытаскиваем» префикс

function test(client, mess) {
    mess.channel.send('Test!')
}

var comms_list = [{
    name: prefix + "test",
    out: (msg) => {
        msg.channel.send('Test!')
    },
    about: "Тестовая команда"
}, {

}];


module.exports.commands = comms_list;