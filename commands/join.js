module.exports = {
  name: "join",
  ownerExclusive: true,
  async execute(message, args){
    message.client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
  }
};
