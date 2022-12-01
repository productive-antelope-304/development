import images, { index } from "./images";

export default function City({ city, onClick }) {
	const id = city.city.replaceAll("/", "_");
	return (
		<section className="window">
			<button
				className="window-body city"
				style={{ backgroundImage: `url(${images[id]?.[index]})` }}
				onClick={onClick}
			>
				<h4
					style={{
						margin: "0",
						color: "white",
						textShadow: [-3, 0, 3]
							.map((x) => [-3, 0, 3].map((y) => `${x}px ${y}px 0 black`))
							.join(", "),
					}}
				>
					{city.city}, {city.state.code}
				</h4>
			</button>
			<div className="status-bar">
				<p className="status-bar-field">Region: {city.state.region}</p>
				<p
					className="status-bar-field"
					style={{ textAlign: "right", maxWidth: "110px" }}
				>
					Population: {city.population.toLocaleString()}
				</p>
			</div>
		</section>
	);
}
