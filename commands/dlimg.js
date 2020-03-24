const Discord = require('discord.js');
const embed = require("../bot-modules/embedtemplate.js");
const ImgDownload = require("image-downloader")

module.exports = {
	name: "flimg",
	description: "Downloads an file.",
	usage: "[filename] (file)",
	args: true,
	async execute(message, args){
    if (!message.attachments) return message.channel.send("Please provide an file.");
    if (!args[0]) return message.channel.send("Please provide a name.")

		const img = message.attachments.first();
		const imgURL = img.url;
		const filename = message.content.slice(6 + 1);
		const filenameExtension = img.filename.split(".")[1];

		const options = {
			url: imgURL,
			dest: `./assets/${filename}.${filenameExtension}`,
			extractFilename: false
		}

		ImgDownload.image(options)
		.then(({ filename }) => {
			message.channel.send(`Saved to \`${filename}\`.`);
			console.log(`Saved to \`${filename}\`.`);
		})
		.catch(error => {
			message.channel.send("Couldn't save file!");
			console.error(error);
		})
  },
};
