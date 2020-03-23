const { logChannelID } = require("../config.json");
const moment = require("moment");

class logger {
  constructor(client) {
    this.channel = client.channels.get(logChannelID);
  }

  log(info){
    const message = `[${moment().format("HH:mm:ss.SSS")}]: ${info}`;
    console.log(message);
    this.channel.send(message);
  }

  error(err){
    const message = `[${moment().format("HH:mm:ss.SSS")}]: ${err}`;
    console.error(message);
    this.channel.send(message);
  }
}

module.exports = logger;
