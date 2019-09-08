module.exports = {
	name: "choose",
	description: "Randomly chooses one of the provided arguments.",
  usage: "[arg1], [arg2], [arg3]...",
  args: true,
	execute(message, args){
    allArgs = message.content.slice(7 + 1);
    arguments = allArgs.split(",")
    const length = arguments.length;
    const num = Math.floor(Math.random() * length);
    message.channel.send(arguments[num]);
  }
};
