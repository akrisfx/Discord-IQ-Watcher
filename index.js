const { Client, Intents } = require('discord.js');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
  });
const comms = require("./commands.js"); // Подключаем файл с командами для бота
const fs = require('fs'); // Подключаем родной модуль файловой системы node.js  
let config = require('./config.json'); // Подключаем файл с параметрами и информацией


let token = config.token; // «Вытаскиваем» из него токен
let prefix = config.prefix; // «Вытаскиваем» из него префикс
let logChannel = config.logServerChannel;

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
});


client.on('messageCreate', (msg) => { 
    if (!msg.content.startsWith('!')) return;
    arguments = msg.content.split(' ');
    console.log(arguments)
    try {
        const commIndex = comms.commands.findIndex((comm) => comm.name === msg.content);
        comms.commands[commIndex].out(msg);
    } catch {};
});

client.login(token);