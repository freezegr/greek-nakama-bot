const { MessageEmbed } = require('discord.js');
const { anime } = require('../index.js');

module.exports = {
  name: 'search-manga',
  description: "command for search",
  aliases: ['manga-search', 'mgsr', 'searchManga'],
  nsfw: false,
  args: true, 
  async execute (client, message, args){
    const manga = await anime.searchManga(args.join(' '))
    
    var errorEmbed = new MessageEmbed()
      .setTitle('Not found')
      .setDescription(`I can't found any manga with tis name ${args.join(' ')}`)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter(`Command requested by ${message.author.username}`)
    
    if(manga.length == 0) return message.channel.send(errorEmbed)
    
    var embed = new MessageEmbed()
      .setTitle(manga[0].titles.en ?  manga[0].titles.en : args.join(' '))
      .setColor('#5C12B3')
      .addField('Titles', [
        `English: ${manga[0].titles.en ? manga[0].titles.en : args.join(' ')}`,
        `English Japanese: ${manga[0].titles.enJp}`
      ])
      .addField('General', [
        `User count: ${manga[0].userCount}`,
        `Favorites count: ${manga[0].favoritesCount}`,
        `Popularity rank: ${manga[0].popularityRank}`,
        `Rating rank: ${manga[0].ratingRank}`,
        `Age rating: ${manga[0].ageRatingGuide}`
      ])
      .addField('Info', [
        `Start date: ${manga[0].startDate}`,
        `End date: ${manga[0].endDate}`,
        `Chapter count: ${manga[0].chapterCount}`,
      ])
      .setDescription(manga[0].synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
      .setThumbnail(message.author.displayAvatarURL())
      .setImage(manga[0].posterImage.original, 50, 120)
      .setTimestamp()
      .setFooter(`Command requested by ${message.author.username}`)
      
    message.channel.send(embed)
  }
};