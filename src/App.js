import { useState } from "react";
import "./App.css";

import cities from "./cities.json";
import stateRegions from "./regions.json";
import data from "./combined-cities";
import Filters from "./Filters";
import City from "./City";
import Cart from "./Cart";
import sorts from "./sorts";
import Admonition from "./Admonition";

function App() {
	const [regions, setRegions] = useState(
		new Set(stateRegions.map((s) => s.region))
	);
	const [states, setStates] = useState(new Set(cities.map((c) => c.state)));
	const [sort, setSort] = useState("pop-desc");
	const [cart, setCart] = useState([]);
	const [bought, setBought] = useState(false);

	const sorter = sorts.find((s) => s.id === sort).by;
	const citiesToShow = data
		.filter((d) => regions.has(d.state.region) && states.has(d.state.code))
		.sort((a, b) => {
			const aValue = sorter(a);
			const bValue = sorter(b);
			return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
		});
	return bought ? (
		<Admonition
			onReset={() => {
				setBought(false);
				setCart([]);
			}}
		/>
	) : (
		<>
			<h2
				style={{
					fontFamily: 'Comic Sans MS, "Comic Sans", cursive',
					color: "white",
					textAlign: "center",
					textShadow:
						[-2, 0, 2]
							.map((x) => [-2, 0, 2].map((y) => `${x}px ${y}px 0 black`))
							.join(", ") +
						", " +
						[-3, 0, 3]
							.map((x) => [-3, 0, 3].map((y) => `${x}px ${y}px 0 #666`))
							.join(", "),
				}}
			>
				Welcome to the City Store!
			</h2>
			<div className="App">
				<aside>
					<Cart cart={cart} setCart={setCart} onBuy={() => setBought(true)} />
					<Filters
						count={citiesToShow.length}
						regions={regions}
						setRegions={setRegions}
						states={states}
						setStates={setStates}
						sort={sort}
						setSort={setSort}
					/>
				</aside>
				<div className="grid">
					{citiesToShow.map((city) => (
						<City
							key={city.city}
							city={city}
							onClick={() => {
								setCart((cart) => {
									if (!cart.includes(city)) {
										return [...cart, city];
									}
									return cart;
								});
							}}
						/>
					))}
				</div>
			</div>
		</>
	);
}

export default App;
