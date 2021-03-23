const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  description: "command for search",
  nsfw: false,
  args: true,
  async execute(client, message, args) {
    let embed = new MessageEmbed()
      .setTitle('Help')
      .setColor('RANDOM')
      .addFields({name: 'Commands', value: [
	    `**Help:** show commands!`,
		`**Projects <status>: ** show the projects (status: ongoing/completed/mos/stalled/dropped)!`,
		`**Search: ** search a project!`,
		`**anime-search <name>: ** search a anime!`,
		`**Manga-search <name>: ** search a manga!`
	  ]})
      .setFooter(`Command requested by ${message.author.username}`)
    message.channel.send(embed)
  }
};