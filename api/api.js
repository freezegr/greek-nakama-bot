const cheerio = require('cheerio');
const request = require('request');
const url = require('url');

module.exports.projects = ((type = 'ongoing') => {
  if(type && type == undefined) type = 'ongoing';
  if(type) type = getType(type);
  function getType(opt){
	  let taip;
	  if(new RegExp('ongoing').test(opt) == true) taip = 'ongoing';
	  if(new RegExp('completed').test(opt) == true) taip = 'completed';
	  if(new RegExp('mos').test(opt) == true) taip = 'mos';
	  if(new RegExp('stalled').test(opt) == true) taip = 'stalled';
	  if(new RegExp('dropped').test(opt) == true) taip = 'dropped';
	  
	  return taip
  };
  if(getType(type) == undefined) type = 'ongoing'
  return new Promise((resolve, reject) => {
    request('https://greek-nakama.com/projects-greek-nakama/', function (error, response, html) {
      if (!error && response.statusCode == 200) {
		let result = []
        var $ = cheerio.load(html);
        let searchType = $(`div[id="${type}"]`)
		  .find('p > a')
		  .toArray()
		for(let i = 0; i < searchType.length; i++){
			result.push({name: url.parse($(searchType[i]).attr('href'), true).query.txt_search, link: $(searchType[i]).attr('href')})
		}
		resolve({type: type,resuts: result})
      }
    });
  });
});

module.exports.search = ((name) => {
  return new Promise((resolve, reject) => {
	  //comming soon
  })
}); 
