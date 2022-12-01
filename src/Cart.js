import "./Cart.css";
import { useToggle } from "./useToggle";

export default function Cart({ cart, setCart, onBuy }) {
	const [collapsed, collapse] = useToggle();

	return (
		<div className="window">
			<div className="title-bar">
				<div className="title-bar-text">City Cart ({cart.length})</div>
				<div className="title-bar-controls">
					<button
						aria-label={collapsed ? "Maximize" : "Minimize"}
						onClick={collapse}
					/>
				</div>
			</div>
			{!collapsed && (
				<>
					<div className="window-body" style={{ position: "relative" }}>
						{cart.length === 0 ? (
							<p
								style={{
									position: "absolute",
									textAlign: "center",
									top: "50%",
									width: "100%",
									transform: "translateY(-50%)",
								}}
							>
								<strong>
									Nothing in the cart yet. Click a city to add it!
								</strong>
							</p>
						) : null}
						<div style={{ visibility: cart.length ? "visible" : "hidden" }}>
							<ul
								className="tree-view"
								style={{ height: 100, overflowY: "scroll" }}
							>
								{cart.map((city) => (
									<li key={city.city}>
										{city.city}, {city.state.name}
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<button
											class="link"
											onClick={() =>
												setCart((cart) => cart.filter((c) => c !== city))
											}
											style={{ float: "right" }}
										>
											Remove
										</button>
									</li>
								))}
							</ul>
							<Joke />
							<button style={{ marginTop: 8 }} onClick={onBuy}>
								Perform acquisition
							</button>
							{"\xA0\xA0\xA0\xA0"}
							<button onClick={() => setCart([])}>Clear cart</button>
						</div>
					</div>
					<div className="status-bar">
						<p className="status-bar-field" style={{ textAlign: "right" }}>
							Total Population:{" "}
							{cart
								.reduce((acc, city) => acc + city.population, 0)
								.toLocaleString()}
						</p>
					</div>
				</>
			)}
		</div>
	);
}

const Joke = () => (
	<fieldset className="cart-method">
		<legend>Acquire city using</legend>
		<div className="field-row">
			<input
				id="acquire-using-money"
				type="radio"
				defaultChecked
				name="acquire-using"
			/>
			<label htmlFor="acquire-using-money">Money</label>
		</div>
		<div className="field-row">
			<input id="acquire-using-landslide" type="radio" name="acquire-using" />
			<label htmlFor="acquire-using-landslide">
				"Landslide" by Fleetwood Mac
			</label>
		</div>
		<div className="field-row">
			<input id="acquire-using-force" type="radio" name="acquire-using" />
			<label htmlFor="acquire-using-force">Force</label>
		</div>
		<div className="field-row">
			<input id="acquire-using-brains" type="radio" name="acquire-using" />
			<label htmlFor="acquire-using-brains">Cognitive Restructuring</label>
		</div>
	</fieldset>
);
