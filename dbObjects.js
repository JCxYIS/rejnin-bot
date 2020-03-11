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

const Quotes = sequelize.import("models/Quotes");
const UserBalance = sequelize.import("models/UserBalance");
const UserBirthdays = sequelize.import("models/UserBirthdays");
const UserItems = sequelize.import("models/UserItems");
const UserPerms = sequelize.import("models/UserPerms");
const UserBalanceHistory = sequelize.import("models/UserBalanceHistory");

// UserItems.prototype.addItem = async function(item) {
// 	const userItem = await UserItems.findOne({
// 		where: { user_id: this.user_id, item_name: item.name },
// 	});
//
// 	if (userItem) {
// 		userItem.amount += 1;
// 		return userItem.save();
// 	}
//
// 	return UserItems.create({ user_id: this.user_id, item_name: item.name, amount: 1 });
// };
//
// UserItems.prototype.getItems = function() {
// 	return UserItems.findAll({
// 		where: { user_id: this.user_id },
// 		include: ["item"],
// 	});
// };

//module.exports = { Users, CurrencyShop, UserItems, Quotes };
module.exports = { Quotes, UserBalance, UserBirthdays, UserItems, UserPerms, UserBalanceHistory };
