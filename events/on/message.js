const fs = require("fs");
const Discord = require("discord.js");
const { prefix, ownerID } = require("../../config.json");
const timestamp = require("../../bot-modules/currentTime.js");
const moment = require("moment");

const cooldowns = new Discord.Collection();
const lastMessage = new Discord.Collection();

module.exports = class {
  constructor(client){
    this.client = client;
  }

  async execute(message){
    //this is a fucking mess lmao fml
    // const preStuff = (message.channel.type === "text") ? `[${message.guild.nameAcronym}][${message.channel.name}]` :
    //   (message.channel.type === "dm") ? `[DM]` : `[${message.channel.type}]`
    //
    // console.log(`[${timestamp}]${preStuff} ${message.author.tag}: ${message.content}`)

  	if (message.author.bot) return;

  	if (message.content.toLowerCase().search(/^hi(gh)* five rejnin!*$/) !== -1)
  		message.channel.send(`High five, <@${message.author.id}>!`);
  	if (message.content.toLowerCase().search(/^j\.?c\.?(★|x)?( ?y\.?i\.?s\.?)?$/) !== -1)
  		message.channel.send("is a lolicon.");
  	if (message.content === "街溪" || message.content === "接西")
  		message.channel.send("是蘿莉控。");

    if (!this.client.currency.get(message.author.id) || this.client.currency.get(message.author.id).lastDaily !== moment().format("L")){
      const user = this.client.currency.get(message.author.id);
      this.client.currency.add(message.author.id, 200);
      user.lastDaily = moment().format("L");
      user.save();
    }

    const prefixes = ["!", "$", "?", "*", "-", "~"];
  	if (prefixes.every( s => !message.content.startsWith(s) )){
      if (message.content.startsWith("<") && message.content.endsWith(">")){
        const num = Math.floor(Math.random() * 2);
        message.client.currency.add(message.author.id, num);
      } else {
        const num = Math.floor(Math.random() * 7) + 2;
        message.client.currency.add(message.author.id, num);
      }

      return;
    }

  	const args = message.content.slice(prefix.length).split(/ +/);
  	const commandName = args.shift().toLowerCase();

  	const command = this.client.commands.get(commandName)
  		|| this.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  	if (!command) return;

    if (command.ownerExclusive && message.author.id !== ownerID){
      message.client.fetchUser(ownerID)
      .then(owner => {
        message.channel.send(`Hey! You're not \`${owner.tag}\`! What are you doing?`);
      })
      .catch(error => console.error(error));
      return;
    }
  	else if (command.guildOnly && message.channel.type !== "text"){
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
  }
}
