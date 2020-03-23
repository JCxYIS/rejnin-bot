const Discord = require("discord.js");
const moment = require("moment");
const { prefix, logChannelID } = require("../../config.json");
const { UserBalance, Quotes } = require("../../dbObjects.js");
let { statuses, online } = require("../../bot-modules/strings.json");
const logClass = require("../../bot-modules/logger.js");

module.exports = class {
    constructor(client) {
      this.client = client;
    }

    async execute(){
      // const origLog = console.log;
      // console.log = (info) => {
      //   this.client.channels.get(logChannelID).send(info);
      //   return origLog(info);
      // }
      // console.log("fuck");

      const logger = new logClass(this.client);
      this.client.logger = logger;

      // message.client.logger.log(`[${moment().format("LTS")}]Logged in as ${this.client.user.tag}!\n`);
      // message.client.logger.log("Servers:\n");
      this.client.logger.log(`Logged in as \`${this.client.user.tag}!\``);
      // this.client.logger.log("Servers:");
      // setTimeout(() => {this.client.logger.error("error")}, 5000);
      //
      // this.client.guilds.forEach(guild => {
      //     this.client.logger.log(" - " + guild.name + "\n");
      // });

      function shuffle(array){
        for (let i = array.length - 1; i > 0; i--){
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

      let statusTimer = 0;
      let i = 0;
      statuses = shuffle(statuses);
      // const idkIfThisEvenWorksFML = () => {
      //   setTimeout(() => {
      //     if (statusTimer === 15){
      //       this.client.user.setActivity(statuses[i]);
      //       i++;
      //       statusTimer = 0;
      //     }
      //     if (moment().format("LTS") === "12:00:00 AM") {
      //       const lb = this.client.channels.get("301333367214047233").lastMessage;
      //       try {
      //         this.client.commands.get("leaderboard").execute(lb, [15]);
      //       } catch (error) {
      //         message.client.logger.error(error);
      //       }
      //     }
      //     statusTimer++;
      //
      //     idkIfThisEvenWorksFML();
      //   }, 60000)
      // }
      // idkIfThisEvenWorksFML();


      setInterval(() => {
        if (statusTimer === 15){
          this.client.user.setActivity(statuses[i]);
          i++;
          if (i >= statuses.length) i = 0;
          statusTimer = 0;
        }
        if (moment().format("HH:mm") === "00:00") {
          const lb = this.client.channels.get("674942919270072324").lastMessage;
          try {
            this.client.commands.get("leaderboard").execute(lb, [15]);
          } catch (error) {
            message.client.logger.error(error);
          }
        }
        statusTimer++;
      }, 60000);

      // huh it does work
      // LMAO YOU FUCKING IDIOT YOU COULDVE USED SETINTERVAL ARE YOU RETARDED
      // don't do this, cpu and mem usage will skyrocket, also you will get rate limited
      // while (true) {
      //   //message.client.logger.log(`i have iterated ${i} times\n`);
      //   i++;
      // }

      this.client.user.setActivity(`Type ${prefix}help for a list of my commands!`);
      this.client.channels.get("594536606241914890").send(online[Math.floor(Math.random() * online.length)]);

    }
};
