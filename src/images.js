import preval from "preval.macro";

const images = preval`
	const fs = require("node:fs");
	const path = require("path");

	const root = path.resolve(__dirname, "..", "public", "cities");

	const cities = fs.readdirSync(root);
	module.exports = cities.map((city) => {
		if (!fs.statSync(path.join(root, city)).isDirectory()) {
			return null;
		}
		const files = fs.readdirSync(path.join(root, city));
		const images = files.filter((f) => f.endsWith(".png"));
		return {
			city: city.split(", ")[0],
			images: images.map((i) => encodeURIComponent(path.join("cities", city, i))),
		};
	}).filter(Boolean);
`;

export default Object.fromEntries(images.map((i) => [i.city, i.images]));

export const index = Math.floor(Math.random() * 3);
