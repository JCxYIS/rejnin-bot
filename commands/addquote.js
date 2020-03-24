const Discord = require('discord.js');
const getUser = require("../bot-modules/getuser.js");
const { Quotes } = require("../dbObjects.js");
const timestamp = require("../bot-modules/currentTime.js");
const ImgDownload = require("image-downloader");

module.exports = {
	name: "addquote",
	description: "Adds a quote to a user.",
	usage: "<user> \"<quote||attachment>\"",
	async execute(message, args){
		async function addQuote(content, user){
			try {
				const quote = await Quotes.create({
					user_id: user.id,
					description: content
				})
				return message.channel.send(`Successfully added quote to **${user.username}**.`)
			} catch(error){
				console.error(error);
				return message.reply('Something went wrong with adding a quote.');
			}
		}

		if (!!message.attachments.first()){
			const name = message.content.slice(message.content.indexOf(" ") + 1);
			let user;
			try {
				user = await getUser(message, name);
			} catch(error){
				console.error(error);
				return message.channel.send("I couldn't find that user!");
			}

			const img = message.attachments.first();
			const imgURL = img.url;
			const filename = message.id;
			const filenameExtension = img.filename.split(".")[1];
			const options = {
				url: imgURL,
				dest: `./assets/quoteimg/${filename}.${filenameExtension}`,
				extractFilename: false
			}

			ImgDownload.image(options)
			.then(({ filename }) => {
				console.log(`[${timestamp}]Quote image saved to \`${filename}\`.`);
			})
			.catch(error => {
				console.error(error);
				return message.channel.send("Couldn't save file!");
			})
			.then(() => {
				const imgToken = `&QUOTEIMAGE ${filename}.${filenameExtension}`;
				addQuote(imgToken, user);
			})
			return;
		}

		const quoteStart = message.content.indexOf("\"");
		const quoteEnd = message.content.lastIndexOf("\"");
		if ((!quoteStart && !quoteEnd) || (quoteStart === quoteEnd)){
			return message.channel.send("Put quotation marks around your quote!");
		}

		const name = message.content.slice(message.content.indexOf(" ") + 1, quoteStart - 1);
		let user;
		try {
			user = await getUser(message, name);
		} catch(error){
			console.error(error);
			return message.channel.send("I couldn't find that user!");
		}
		const content = message.content.slice(quoteStart + 1, quoteEnd);
		addQuote(content, user);
	},
};
