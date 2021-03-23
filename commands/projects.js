const { MessageEmbed } = require('discord.js');
const { projects } = require('../api/api.js')

module.exports = {
  name: 'projects',
  description: "command for search",
  nsfw: false,
  args: true,
  async execute(client, message, args) {
    const typeVar = args.join(' ')
    var embed = new MessageEmbed()
      .setTitle('Greek nakama bot')
      .setColor('RANDOM')
      .setTimestamp()
      .setFooter(`Command requested by ${message.author.username}`)
    let project = await projects(typeVar)
    let fields = []
    for (let i = 0; i < project.resuts.length; i++) {
      fields.push(`${project.resuts[i].name}: **[click me](${project.resuts[i].link})**`)
    }
    if (project.type == 'mos') project.type = 'Movies OVA Special';
    embed.addFields({
      name: project.type,
      value: fields
    })
    if (embed.fields[0].value.length > 1000) {
      Array.range = function (n) { // Array.range(5) --> [0,1,2,3,4] 
        return Array.apply(null, Array(n)).map((x, i) => i)
      };
      Object.defineProperty(Array.prototype, 'chunk', {
        value: function (n) {
          return Array.range(Math.ceil(this.length / n)).map((x, i) => this.slice(i * n, i * n + n));
        }
      });
      for (let i = 0; i < fields.chunk(10).length; i++) {
        embed.addFields({
          name: project.type,
          value: fields.chunk(10)[i]
        })
      }
      embed.fields[0] = []
      return message.channel.send(embed);
    }
    message.channel.send(embed)
  }
};
