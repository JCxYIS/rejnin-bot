const Discord = require('discord.js');
const Canvas = require('canvas');
const timestamp = require("../../bot-modules/currentTime.js");
const getDefaultChannel = require("../../bot-modules/getdefaultchannel.js");

module.exports = class {
  constructor(client){
    this.client = client;
  }
  async execute(member){
    const canvas = Canvas.createCanvas(742, 924);
    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage('./assets/welcome.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.font = "50px 'Comic Sans MS'";
    ctx.fillText(`Welcome to the \nserver, ${member.displayName}!`, 200, 150);
    //x:200px y:150px to x:400px y:130px


    const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

    getDefaultChannel(member.guild, this.client).send(`Welcome to the server, ${member}!`, attachment);
    message.client.logger.log(`${member.displayName} has joined ${member.guild.nameAcronym}.`);
  }
}
