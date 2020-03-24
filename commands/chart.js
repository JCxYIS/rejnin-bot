const Discord = require('discord.js');
const Canvas = require("canvas");
const moment = require("moment");
const getUser = require("../bot-modules/getuser.js");
const { CanvasRenderService } = require("chartjs-node-canvas");
const { UserBalanceHistory } = require("../dbObjects.js"); //return moment(date).utcOffset("+00:00").format('YYYY-MM-DD HH:mm:ss.SSS Z');

module.exports = {
	name: "chart",
	description: "Displays a chart of a user's balance over time.",
  usage: "<user>",
	async execute(message, args){
		function HexToRGBA(hexString, a) {
			const rgb = [hexString.slice(-6, -4), hexString.slice(-4, -2), hexString.slice(-2)];
			let rgba = rgb.map(hex => parseInt(hex, 16));
			rgba.push(a);
			return rgba;
		}

		const author = !!args[0] ? await getUser(message, args[0]) : message.author;
		const allHistory = await UserBalanceHistory.findAll({ where: { user_id: author.id }});
		const data = allHistory.map(entry => {
			return { x: moment(entry.timestamp, "YYYY-MM-DD HH:mm:ss.SSS Z"), y: entry.balance };
		});
		const mainColor = message.guild.members.has(author.id) ? message.guild.members.get(author.id).displayHexColor : "#00A9CC";
		const fillColor = HexToRGBA(mainColor, 0.2);
		const borderColor = HexToRGBA(mainColor, 0.7);

		const canvasRenderService = new CanvasRenderService(1000, 300, (ChartJS) => {	});
		//moment("2020-03-10 16:26:37.348 +00:00", "YYYY-MM-DD HH:mm:ss.SSS Z"),
		const options = {
			scales: {
				xAxes: [{
					type: "time",
					time: {
						minUnit: "day",
					},
					distribution: "linear",
					bounds: "data",
					ticks: {
						source: "auto",
					}
				}],
				yAxes: [{
					ticks: {
						beginAtZero: true,
					}
				}]
			},
		};

		const datasets = [{
			label: `${author.username}'s Balance History`,
			data: data,
			borderColor: `rgba(${borderColor[0]}, ${borderColor[1]}, ${borderColor[2]}, ${borderColor[3]})`,
			backgroundColor: `rgba(${fillColor[0]}, ${fillColor[1]}, ${fillColor[2]}, ${fillColor[3]})`,
			pointRadius: 0,
			steppedLine: "before",
		}];

		const chartConfig = {
			type: "line",
			data: {
			  datasets: datasets,
			},
			options: options
		};

		canvasRenderService.renderToBuffer(chartConfig)
		.then((image) => {
			const attachment = new Discord.Attachment(image, 'chart.png');
			message.channel.send(attachment);
		})
		.catch(error => {
			console.error(error);
		});
	},
};
