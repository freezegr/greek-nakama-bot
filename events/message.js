const { client } = require('../index.js');
const { prefix } = require('../config.json');
const Discord = require('discord.js');

client.commands = new Discord.Collection();

client.on('message', message => { 
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  if(command != undefined && command.nsfw == true && message.channel.nsfw == false) return message.delete().then(()=>message.channel.send(new Discord.MessageEmbed().setTitle('Nsfw content is not allowed').setDescription('Please allow nsfw channel content fot use nsfw command!').setImage('https://i.imgur.com/oe4iK5i.gif').setFooter(`Command requested by ${message.author.username}`))).then(msg=> msg.delete({timeout: 10000}))
  if (!command) return;
	try {
	 command.execute(client, message, args);
	} catch (error) {
	 console.error(error);
	} 
});