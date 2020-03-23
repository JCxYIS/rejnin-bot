const fs = require("fs");
const Discord = require("discord.js");
const Sequelize = require("sequelize");
const { token } = require("./config.json");
const { UserBalance, UserBalanceHistory } = require("./dbObjects.js");

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.currency = new Discord.Collection();
//bruh I'm getting nowhere with this bot fml

async function init(){
	const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);
		client.commands.set(command.name, command);
	};

	const onEventFiles = fs.readdirSync("./events/on").filter(file => file.endsWith(".js"));
	for (const file of onEventFiles){
		const onEventName = file.split(".")[0];
		const onEvent = new (require(`./events/on/${file}`))(client);
		client.on(onEventName, (...args) => onEvent.execute(...args));
	};

	const onceEventFiles = fs.readdirSync("./events/once").filter(file => file.endsWith(".js"));
	for (const file of onceEventFiles){
		const onceEventName = file.split(".")[0];
		const onceEvent = new (require(`./events/once/${file}`))(client);
		client.once(onceEventName, (...args) => onceEvent.execute(...args));
	};

	//syncing currency model with collection
	const storedBalances = await UserBalance.findAll();
	storedBalances.forEach(b => client.currency.set(b.user_id, b));

	Reflect.defineProperty(client.currency, 'add', {
		value: async function add(id, amount) {
			const user = client.currency.get(id);
			if (!user) {
				//if (amount < 0) return channel.send(`Insufficient Doubees. ($**0**)`);
				const newUser = await UserBalance.create({ user_id: id, balance: amount });
				UserBalanceHistory.create({ user_id: id, balance: amount });
				client.currency.set(id, newUser);
				return newUser;
			}
			user.balance += Number(amount);
			UserBalanceHistory.create({ user_id: id, balance: user.balance });
			return user.save();
		},
	});

	Reflect.defineProperty(client.currency, 'getBalance', {
		value: function getBalance(id) {
			const user = client.currency.get(id);
			return user ? user.balance : 0;
		},
	});
	client.login(token);
};

init();
//usage syntax: <> required [] optional
