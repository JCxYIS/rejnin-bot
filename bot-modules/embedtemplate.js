const embed = function(message){
	const Client = message.client;
	const embedTemplate = {
		"color": Math.floor((Math.random() * 16777216)),
		"timestamp": new Date(),
		"footer": {
			"text": `${Client.user.username} is a bot made by ninjer#6366`
		},
		// "author": {
		// 	"name": Client.user.username,
    //   "icon_url": Client.user.avatarURL
		// }
	}
	return embedTemplate;
};

module.exports = embed;
