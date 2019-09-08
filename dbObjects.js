const fs = require("fs");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "username", "password", {
	host: "localhost",
	dialect: "sqlite",
	logging: false,
	storage: "database.sqlite",
});

// const Models = new Map()
// const modelFiles = fs.readdirSync("./models").filter(file => file.endsWith(".js"));
// for (const file of modelFiles) {
// 	const model = file.split(".")[0];
// 	Models.set(model, sequelize.import(`./models/${file}`)); //sequelize magic method stuff (same as require(blah)(sequelize, Sequelize))
// };

const Users = sequelize.import("models/Users");
const CurrencyShop = sequelize.import("models/CurrencyShop");
const UserItems = sequelize.import("models/UserItems");
const Quotes = sequelize.import("models/Quotes")

UserItems.belongsTo(CurrencyShop), { foreignKey: "item_id", as: "item" };

Users.prototype.addItem = async function(item) {
	const userItem = await UserItems.findOne({
		where: { user_id: this.user_id, item_id: item.id },
	});

	if (userItem) {
		userItem.amount += 1;
		return userItem.save();
	}

	return UserItems.create({ user_id: this.user_id, item_id: item.id, amount: 1 });
};

Users.prototype.getItems = function() {
	return UserItems.findAll({
		where: { user_id: this.user_id },
		include: ["item"],
	});
};

module.exports = { Users, CurrencyShop, UserItems, Quotes};
