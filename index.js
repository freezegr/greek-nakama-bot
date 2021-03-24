const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const animeJs = require('@freezegold/anime.js');
const anime = new animeJs.Client();

module.exports.anime = anime;
module.exports.client = client;

client.events = new Discord.Collection();
client.category = new Discord.Collection();

const eventsFile = fs.readdirSync('./events').filter(file => file.endsWith('.js'))
for(let ev of eventsFile){
	require(`./events/${ev}`)
}

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
let count = 0;
for (const file of commandFiles) {
  count++
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
  console.log(`${file} loaded!`);
};


client.login(proceess.env.TOKEN);



