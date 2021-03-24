const { MessageEmbed } = require('discord.js');
const { search, chunks } = require('../api/api.js')

module.exports = {
  name: 'search',
  description: "command for search",
  nsfw: false,
  args: true,
  async execute(client, message, args) {
    const nameArg = args.join(' ')
    var embed = new MessageEmbed()
      .setTitle('Greek nakama bot')
      .setColor('RANDOM')
      .setTimestamp()
      .setThumbnail(message.author.avatarURL({
        dynamic: true
      }))
      .setFooter(`Command requested by ${message.author.username}`)
    if (nameArg.length == 0) {
      try {
        return message.channel.send(embed.setDescription('You miss the name !search <name>')).then(msg => {
          msg.delete({
            timeout: 10000
          })
          message.delete({
            timeout: 10000
          })
        })
      } catch (err) {
        //nothing
      }
    }
    let project = await search(nameArg)
    if (project.results.length == 0) {
      try {
        return message.channel.send(embed.setDescription('No result')).then(msg => {
          msg.delete({
            timeout: 10000
          })
          message.delete({
            timeout: 10000
          })
        })
      } catch (err) {
        console.log(err)
      }
    }
    Object.defineProperty(Array.prototype, 'chunk_inefficient', {
      value: function (chunkSize) {
        var array = this;
        return [].concat.apply([],
          array.map(function (elem, i) {
            return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
          })
        );
      },
      configurable: true
    });

    Array.range = function (n) { // Array.range(5) --> [0,1,2,3,4] 
      return Array.apply(null, Array(n)).map((x, i) => i)
    };
    Object.defineProperty(Array.prototype, 'chunk', {
      value: function (n) {
        return Array.range(Math.ceil(this.length / n)).map((x, i) => this.slice(i * n, i * n + n));
      },
      configurable: true
    });
    let CharLength = 0;

    function test() {
      let stastotic = false
      //console.log(project.results.chunk_inefficient)
      for (let i = 0; i < project.results.chunk_inefficient(10).length; i++) {
        project.results.chunk_inefficient(10)[i].forEach(function (x) {
          CharLength = CharLength + x.name.length + x.url.length
          if (CharLength < 5000) {
            embed.addFields({
              name: x.name,
              value: `[DOWNLOAD](${x.url})`,
              inline: true
            })
          } else if (stastotic == true) {

          } else {
            embed.addFields({
              name: 'max length',
              value: `[click me](${x.url})`,
              inline: true
            })
            stastotic = true
            embed.setDescription(`A lot of result for see all of them **[click me](${project.linkUrl})**`)
          }

          //console.log(embed.fields)
        })

      }
      //console.log('finsih')
    }
    await test()
    message.channel.send(embed)
  }
};