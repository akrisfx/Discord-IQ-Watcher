const { Client, Intents } = require('discord.js');
const mongoose = require('mongoose')
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] // это чтобы апишка дискорда работала, без этого не работает(я про флаги)
});
const comms = require("./commands.js"); // Подключаем файл с командами для бота
const fs = require('fs'); // Подключаем родной модуль файловой системы node.js  (пока не используется)
let config = require('./config.json'); // Подключаем файл с параметрами и информацией

let token = config.token; // «Вытаскиваем» из него токен
let prefix = config.prefix; // «Вытаскиваем» из него префикс
let logChannel = config.logServerChannel;

mongoose.connect(config.mongoDB)
    .then (console.log('mongo connected'))
    .catch (error => { console.log(error)})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
});

client.on('messageCreate', (msg) => { 
    if (!msg.content.startsWith('!')) return;
    const arguments = msg.content.split(' '); // разделяем сообщение на аргументы
    try {
        const commIndex = comms.commands.findIndex((comm) => comm.name === arguments[0]); // ищем в списке команд
        comms.commands[commIndex].out(msg, arguments);
    } catch(error) { console.log(error) };
});

client.login(token);