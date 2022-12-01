import { useEffect, useState } from "react";
import "./App.css";

import cities from "./cities.json";
import stateRegions from "./regions.json";
import data from "./combined-cities";
import Filters from "./Filters";
import City from "./City";
import Cart from "./Cart";
import sorts from "./sorts";

function App() {
	const [regions, setRegions] = useState(
		new Set(stateRegions.map((s) => s.region))
	);
	const [states, setStates] = useState(new Set(cities.map((c) => c.state)));
	const [text, setText] = useState("");
	const [sort, setSort] = useState("pop-desc");
	const [cart, setCart] = useState([]);
	const [bought, setBought] = useState(false);

	useEffect(() => {
		document.body.classList.toggle("bought", bought);
	}, [bought]);

	const sorter = sorts.find((s) => s.id === sort).by;
	const citiesToShow = data
		.filter(
			(d) =>
				regions.has(d.state.region) &&
				states.has(d.state.code) &&
				d.city.toLowerCase().includes(text.toLowerCase())
		)
		.sort((a, b) => {
			const aValue = sorter(a);
			const bValue = sorter(b);
			return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
		});
	return bought ? (
		<div style={{ fontSize: "2em" }}>
			<p>hey</p>
			<p>don’t do that</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>you can’t buy a city</p>
			<p>&nbsp;</p>
			<p>
				that is a terrible idea for so many reasons, here’s a few from GPT-3:
			</p>
			<ol>
				<li>It would be incredibly expensive.</li>
				<li>It is not legal to buy a city.</li>
				<li>
					Buying a city would likely cause a lot of financial stress to the
					current citizens, who would suddenly have to pay rent to you.
				</li>
				<li>
					You would be responsible for providing public services such as police,
					fire, health care, etc.
				</li>
				<li>
					You would have to deal with local laws and regulations that you may
					not be familiar with.
				</li>
				<li>
					There would likely be a lot of tension between you (as the new
					landlord) and the residents, who may not want you to be there.
				</li>
			</ol>
			<p>
				<a
					href="javascript:void(0)"
					onClick={() => {
						setBought(false);
						setCart([]);
					}}
					style={{
						filter: "invert() hue-rotate(180deg)",
						textDecorationSkip: "none",
					}}
				>
					i'm sorry
				</a>
			</p>
		</div>
	) : (
		<>
			<h2 style={{ fontFamily: 'Comic Sans MS, "Comic Sans", cursive' }}>
				City Purchasing Tool
			</h2>
			<div className="App">
				<aside
					style={{
						width: 300,
						alignSelf: "flex-start",
						display: "flex",
						flexDirection: "column",
						gap: 8,
					}}
				>
					<Cart cart={cart} setCart={setCart} onBuy={() => setBought(true)} />
					<Filters
						count={citiesToShow.length}
						regions={regions}
						setRegions={setRegions}
						states={states}
						setStates={setStates}
						text={text}
						setText={setText}
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
