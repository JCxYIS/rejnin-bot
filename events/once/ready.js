const Discord = require("discord.js");
const { prefix } = require("../../config.json");
const { UserBalance, Quotes } = require("../../dbObjects.js");
const timestamp = require("../../bot-modules/currentTime.js");

module.exports = class {
    constructor(client) {
      this.client = client;
    }

    async execute(){
      console.log(`[${timestamp}][System]Logged in as ${this.client.user.tag}!\n`);
      console.log("Servers:\n");
      this.client.guilds.forEach(guild => {
          console.log(" - " + guild.name + "\n");
      });

      this.client.user.setActivity(`Type ${prefix}help for a list of my commands!`);
      this.client.channels.get("594536606241914890").send("Hello again!");
    }
};
