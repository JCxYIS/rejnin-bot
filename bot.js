const fs = require("fs");
const Discord = require("discord.js");
const Sequelize = require("sequelize");
const { token } = require("./config.json");
const { Users, CurrencyShop } = require("./dbObjects.js");

const client = new Discord.Client();
const clientAttchments = ["commands", "currency"];
for (const name of clientAttchments){
	client[name] = new Discord.Collection();
};
//bruh I'm getting nowhere with this bot fml

Reflect.defineProperty(client.currency, 'add', {
	value: async function add(id, amount) {
		const user = client.currency.get(id);
		if (user) {
			user.balance += Number(amount);
			return user.save();
		}
		const newUser = await Users.create({ user_id: id, balance: amount });
		client.currency.set(id, newUser);
		return newUser;
	},
});

Reflect.defineProperty(client.currency, 'getBalance', {
	value: function getBalance(id) {
		const user = client.currency.get(id);
		return user ? user.balance : 0;
	},
});

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

client.login(token);

//usage syntax: <> required [] optional
