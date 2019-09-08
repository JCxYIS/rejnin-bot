const embed = function(message){
	const Client = message.client;

	const embedTemplate = {
		"color": Math.floor((Math.random() * 16777216)),
		"timestamp": new Date(),
		"thumbnail": {
			"url": `${Client.user.avatarURL}`
		},
		"footer": {
			"icon_url": `${Client.user.avatarURL}`,
			"text": `${Client.user.username} is a bot made by ninjer#6366`
		},
		"author": {
			"name": `${message.author.username}`,
			"icon_url": `${message.author.displayAvatarURL}`
		},
	}
	return embedTemplate;
};
//
// const getUser = function(message, param) = {
//
// };

module.exports = embed;
