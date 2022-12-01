const sorts = [
	{ label: "Name (A-Z)", id: "name", by: (c) => c.city },
	{ label: "Population (low to high)", id: "pop-asc", by: (c) => c.population },
	{
		label: "Population (high to low)",
		id: "pop-desc",
		by: (c) => -c.population,
	},
];

export default sorts;
