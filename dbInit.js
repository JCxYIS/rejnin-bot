const Sequelize = require('sequelize');
const fs = require("fs");

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false, //setting this to false disables the verbose output from Sequelize. Set it to true when you are trying to debug.
	operatorsAliases: false,
	storage: 'database.sqlite',
});

const models = new Map();
const modelFiles = fs.readdirSync("./models").filter(file => file.endsWith(".js"));
for (const file of modelFiles) {
	const model = file.split(".")[0];
	models.set(model, sequelize.import(`./models/${file}`)); //sequelize magic method stuff (same as require(blah)(sequelize, Sequelize))
};

const force = process.argv.includes("--force") || process.argv.includes("--f");

sequelize.sync({ force }).then(async () => {
  // const shop = [
  //   models.get("CurrencyShop").upsert({name: "Tea", cost: 1}),
  //   models.get("CurrencyShop").upsert({name: "Cookie", cost: 3}),
  //   models.get("CurrencyShop").upsert({name: "Cake", cost: 5})
  // ];
  // await Promise.all(shop);
  console.log("Database synced.");
  sequelize.close();
}).catch(console.error);
