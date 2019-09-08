const fs = require("fs");
const Discord = require('discord.js');
const { token, prefix } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log("Servers:");
    client.guilds.forEach(guild => {
        console.log(" - " + guild.name);
    });

    client.user.setActivity(`Type ${prefix}help for a list of my commands!`);
		client.channels.get("594536606241914890").send("Hello again!");
})

client.login(token);

client.on("guildCreate", guild => {
	const joinEmbed = {
		"color": Math.floor((Math.random() * 16777216)),
		"title": "Hello! I'm Rejnin!",
		"description": `Nice to meet you all, I'm ninjer's bot and also his friend! As of now, I only have a few simple commands, but ninjer will implement more in the future. This is ninjer's first ever bot, so please go easy on him!\n\n*(Tip: You can type ${prefix}help for a list of my commands)*`,
		"timestamp": new Date(),
		"thumbnail": {
			"url": `${client.user.avatarURL}`
		},
		"footer": {
			"icon_url": `${client.user.avatarURL}`,
			"text": `${client.user.username} is a bot made by ninjer#6366`
		},
		"author": {
			"name": `${client.user.username}`,
			"icon_url": `${client.user.avatarURL}`
		},
	};
	let channelID;
	let channels = guild.channels;
	channelLoop:
	for (let c of channels) {
			let channelType = c[1].type;
			if (channelType === "text") {
					channelID = c[0];
					break channelLoop;
			}
	};
	let channel = client.channels.get(guild.systemChannelID || channelID);
	channel.send({embed: joinEmbed});
});

client.on('message', message => {
	if (message.author.bot) return;

	if (message.content.toLowerCase().search(/^hi(gh)* five rejnin!*$/) !== -1)
		message.channel.send(`High five, <@${message.author.id}>!`);
	if (message.content.toLowerCase().search(/^j\.?c\.?(★|x)?( ?y\.?i\.?s\.?)?$/) !== -1)
		message.channel.send("is a lolicon.");
	if (message.content === "街溪" || message.content === "接西")
		message.channel.send("是羅莉控。");

	if (!message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;

	if (command.guildOnly && message.channel.type !== "text"){
		return message.channel.send("This is a server only command. Dummy.");
	}

	else if (command.args && !args.length){
		let reply = "You didn't provide any arguments. Dummy.";
		if (command.usage){
			reply += `\nThe correct usage would be: ${prefix}${command.name} ${command.usage}`;
		}
		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 2) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});
