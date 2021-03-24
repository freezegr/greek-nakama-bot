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
    let project = await search(nameArg)
    //chunks function

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

    /*Array.range = function (n) { // Array.range(5) --> [0,1,2,3,4] 
        return Array.apply(null, Array(n)).map((x, i) => i)
      };
      Object.defineProperty(Array.prototype, 'chunk', {
        value: function (n) {
        return Array.range(Math.ceil(this.length / n)).map((x, i) => this.slice(i * n, i * n + n));
      }
    });*/
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

/*
    .then(async msg => {
      await msg.react('◀️');
      await msg.react('▶️');
      await msg.react('⏸️')

      const filter = (reaction, user) => {
        return ['◀️', '▶️', '⏸️'].includes(reaction.emoji.name) && user.id === message.author.id;
      };
      let counting = 0

      function retest() {
        msg.awaitReactions(filter, {
            max: 1,
            time: 30000,
            errors: ['time']
          })
          .then(collected => {
            const reaction = collected.first();

            async function reacting(filter, collected, reaction) {
			  console.log(counting)
			  if(counting == min){
				  //min kaneis tt
			  } else if(counting == max){
				  //min kaneis tpt
			  } else if(counting < min){
				  //console.log(counting)
				  console.log('counting < min')
				  counting = min
			  }else if (counting > max){
				  counting = max
				  console.log('counting > max')
			  }else {
                //console.log(counting)
				setField(counting)
				console.log(setField(counting))
                msg.edit(embed)
			  }
            }
            if (reaction.emoji.name === '◀️') {
			  counting = counting - 1
              reacting(filter, collected, reaction)
			  console.log(msg)
			  msg.reactions.cache.forEach(reaction => reaction.remove(message.author.id))
			  console.log(message.author.id)
			  retest()
            } else if (reaction.emoji.name === '▶️') {
			  counting = counting + 1
              reacting(filter, collected, reaction)
			  msg.reactions.cache.forEach(reaction => reaction.remove(message.author.id))
			  console.log(message.author.id)
              retest()
            } else if (reaction.emoji.name === '⏸️') {
              message.delete()
              msg.delete()
            }

          })
          .catch(errors => {
			console.log(errors)
            msg.delete()
            message.delete()
            message.reply('Select a reactions')
          })
      }
      retest()
    })
*/