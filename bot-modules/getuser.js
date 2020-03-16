function getUserByName(collection, name){
  const memberObject = collection.find(member => member.displayName.toLowerCase().startsWith(name.toLowerCase()) || member.user.username.toLowerCase().startsWith(name.toLowerCase()));
  if (!memberObject) return "";
  return memberObject.user;
};

async function getUser(message, searchParameter){
  if (!message || !searchParameter) return;
  const user = isNaN(searchParameter) ?
  message.mentions.users.first()
  || getUserByName(message.guild.members.cache, searchParameter) :
  await message.client.users.fetch(searchParameter, true);
  return user;
};
module.exports = getUser;
