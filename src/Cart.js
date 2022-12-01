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
					<button aria-label="Close" onClick={() => setCart([])} />
				</div>
			</div>
			{!collapsed && (
				<>
					<div className="window-body">
						{cart.length === 0 ? (
							<p>
								<strong>
									Nothing in the cart yet. Click a city to add it!
								</strong>
							</p>
						) : (
							<>
								<ul style={{ paddingLeft: "0", listStylePosition: "inside" }}>
									{cart.map((city) => (
										<li key={city.city}>
											{city.city}, {city.state.name}
										</li>
									))}
								</ul>
								<fieldset style={{ marginTop: 8 }}>
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
										<input
											id="acquire-using-force"
											type="radio"
											name="acquire-using"
										/>
										<label htmlFor="acquire-using-force">Force</label>
									</div>
									<div className="field-row">
										<input
											id="acquire-using-landslide"
											type="radio"
											name="acquire-using"
										/>
										<label htmlFor="acquire-using-landslide">
											"Landslide" by Fleetwood Mac
										</label>
									</div>
									<div className="field-row">
										<input
											id="acquire-using-brains"
											type="radio"
											name="acquire-using"
										/>
										<label htmlFor="acquire-using-brains">
											Cognitive Restructuring
										</label>
									</div>
								</fieldset>
								<button style={{ marginTop: 8 }} onClick={onBuy}>
									Perform Acquisition
								</button>
							</>
						)}
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
