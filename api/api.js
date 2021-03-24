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


module.exports.search = ((name = 'aquarion evol!') => {
  return new Promise((resolve, reject) => {
    //console.log(`https://greek-nakama.com/tracker/?txt_search=${encodeURIComponent(name)}+&select_page=10&anime_per_page=100`)
    request(`https://greek-nakama.com/tracker/?txt_search=${encodeURIComponent(name)}+&select_page=10&anime_per_page=100`, async function (error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);

        let megaResult = {
          names: [],
          url: [],
        }

        function finish() {
          let getName = $('tbody[class="tracker-body"]')
            .find('tr > td > strong')
            .toArray()
          for (let i = 0; i < getName.length; i++) {
            megaResult.names.push($(getName[i]).html())
          }
          let getURL = $('tbody[class="tracker-body"]')
            .find('tr > td > a')
            .toArray()
          for (let i = 0; i < getURL.length; i++) {
            if ($(getURL[i]).attr('href') != 'https://myanimelist.net/anime/40748/Jujutsu_Kaisen_TV') megaResult.url.push(getUrlFun($(getURL[i]).attr('href')))
          }

        }

        function getUrlFun(link) {
          let host = link.replace("https://" + url.parse(link, true).host + "/download/", "")
          return 'https://greek-nakama.com/download/' + encodeURIComponent(host)

        }
        await finish()
        let result = []

        function lolota() {
          for (let i = 0; i < megaResult.names.length; i++) {
            result.push({
              name: megaResult.names[i],
              url: megaResult.url[i]
            })
          }
        }
        await lolota()
        resolve({
          linkUrl: `https://greek-nakama.com/tracker/?txt_search=${encodeURIComponent(name)}+&select_page=10&anime_per_page=100`,
          results: result
        })
      }
    });
  })

});

/*
module.exports.search = ((name = 'aquarion evol!') => {
  return new Promise((resolve, reject) => {
    request('https://greek-nakama.com/projects-greek-nakama/', function (error, response, html) {
      if (!error && response.statusCode == 200) {
        let result = []
        var $ = cheerio.load(html);

        //ongoin
        let searchType = $(`div[id="$ongoing}"]`)
          .find('p > a')
          .toArray()
        for (let i = 0; i < searchType.length; i++) {
          result.push({
			type: 'ongoin',
            name: url.parse($(searchType[i]).attr('href'), true).query.txt_search,
            link: $(searchType[i]).attr('href'),
          })
        }

        //completed
        let searchType1 = $(`div[id="completed"]`)
          .find('p > a')
          .toArray()
        for (let i = 0; i < searchType1.length; i++) {
          result.push({
			  type: 'completed',
            name: url.parse($(searchType1[i]).attr('href'), true).query.txt_search,
            link: $(searchType1[i]).attr('href')
          })
        }

        //mos
        let searchType2 = $(`div[id="mos"]`)
          .find('p > a')
          .toArray()
        for (let i = 0; i < searchType2.length; i++) {
          result.push({
			type: 'mos',
            name: url.parse($(searchType2[i]).attr('href'), true).query.txt_search,
            link: $(searchType2[i]).attr('href')
          })
        }

        //stalled
        let searchType3 = $(`div[id="stalled"]`)
          .find('p > a')
          .toArray()
        for (let i = 0; i < searchType3.length; i++) {
          result.push({
			type: 'stalled',
            name: url.parse($(searchType3[i]).attr('href'), true).query.txt_search,
            link: $(searchType3[i]).attr('href')
          })
        }

        //dropped
        let searchType4 = $(`div[id="dropped"]`)
          .find('p > a')
          .toArray()
        for (let i = 0; i < searchType4.length; i++) {
          result.push({
			type: 'dropped',
            name: url.parse($(searchType4[i]).attr('href'), true).query.txt_search,
            link: $(searchType4[i]).attr('href')
          })
        }
		if(result.map(c => c.name).includes(name)){
			console.log(result.filter(c => c.name == name))
		}
		console.log(name)
		console.log(result.map(c => c.name).includes(name))
      }
    });
  })
});

*/
