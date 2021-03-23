const { MessageEmbed } = require('discord.js');
const { anime } = require('../index.js');

module.exports = {
  name: 'search-anime',
  description: "command for search",
  aliases: ['anime-search', 'ansr'],
  nsfw: false,
  args: true, 
  async execute (client, message, args){
    const ani = await anime.searchAnime(args.join(' '))

    var errorEmbed = new MessageEmbed()
      .setTitle('Not found')
      .setDescription(`I can't found any anime with tis name ${args.join(' ')}`)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter(`Command requested by ${message.author.username}`)
    
    if(ani.length == 0) return message.channel.send(errorEmbed)
    
    var embed = new MessageEmbed()
      .setTitle(ani[0].titles.english ? ani[0].titles.english : args.join(' '))
      .setColor('#5C12B3')
      .addField('Titles', [
        `English: `+ani[0].titles.english ? ani[0].titles.english : args.join(' '),
        `Japanese: ${ani[0].titles.japanese}`
      ])
      .addField('General', [
        `User count: ${ani[0].userCount}`,
        `Favorites count: ${ani[0].favoritesCount}`,
        `Popularity rank: ${ani[0].popularityRank}`,
        `Rating rank: ${ani[0].ratingRank}`,
        `Age rating: ${ani[0].ageRatingGuide}`,
        `Trailer: [click here](${ani[0].youtubeVideoId})`
      ])
      .addField('Info', [
        `Start date: ${ani[0].startDate}`,
        `End date: ${ani[0].endDate}`,
        `Episode count: ${ani[0].episodeCount}`,
        `nsfw: ${ani[0].nsfw}`
      ])
      .setDescription(ani[0].synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
      .setThumbnail(message.author.displayAvatarURL())
      .setImage(ani[0].posterImage.original, 100, 200)
      .setTimestamp()
      .setFooter(`Command requested by ${message.author.username}`)
      
    message.channel.send(embed)
  }
};