const timestamp = require("../../bot-modules/currentTime.js");
const getDefaultChannel = require("../../bot-modules/getdefaultchannel.js");

module.exports = class {
  constructor(client){
    this.client = client;
  }
  async execute(guild){
    const joinEmbed = {
      "color": Math.floor((Math.random() * 16777216)),
      "title": "Hello! I'm Rejnin!",
      "description": `Nice to meet you all, I'm ninjer's bot and also his friend! As of now, I only have a few simple commands, but ninjer will implement more in the future. This is ninjer's first ever bot, so please go easy on him!\n\n*(Tip: You can type ${prefix}help for a list of my commands)*`,
      "timestamp": new Date(),
      "thumbnail": {
        "url": `${this.client.user.avatarURL}`
      },
      "footer": {
        "icon_url": `${this.client.user.avatarURL}`,
        "text": `${this.client.user.username} is a bot made by ninjer#6366`
      }
    };

    getDefaultChannel(guild, this.client).send({embed: joinEmbed});
    console.log(`[${timestamp}][Bot] Joined ${guild.name}.`)
  }
}
