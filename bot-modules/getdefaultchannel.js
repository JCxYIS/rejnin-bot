function getDefaultChannel(guild, client){
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
  let channel = client.channels.cache.get(guild.systemChannelID || channelID);
  return channel;
};

module.exports = getDefaultChannel;
