const { client } = require("../index.js");

client.on('ready', () => {
      let statuses = [
        "!help",
        "Version v0.0.1 beta",
        "Greek-Nakama",
		"Anime <3"
      ];
    setInterval(function() {
    	let status = statuses[Math.floor(Math.random() * statuses.length)];
    	client.user.setActivity(status, {type: "WATCHING"});
    }, 5000)
	console.log('[bot]:I am ready!');
});
