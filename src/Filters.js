import { useToggle } from "./useToggle";
import cities from "./cities.json";
import data from "./combined-cities";
import stateRegions from "./regions.json";
import sorts from "./sorts";

const allRegions = [
	...new Set(stateRegions.map((state) => state.region)),
].sort();

const allStates = [...new Set(data.map((d) => d.state))].sort((a, b) =>
	a.name < b.name ? -1 : a.name > b.name ? 1 : 0
);

export default function Filters({
	count,
	regions,
	setRegions,
	states,
	setStates,
	text,
	setText,
	sort: currentSort,
	setSort,
}) {
	const [collapsed, collapse] = useToggle();
	return (
		<div className="window">
			<div className="title-bar">
				<div className="title-bar-text">
					Filter & Sort ({count} {count === 1 ? "city" : "cities"} shown)
				</div>
				<div className="title-bar-controls">
					<button
						aria-label={collapsed ? "Maximize" : "Minimize"}
						onClick={collapse}
					/>
				</div>
			</div>
			{!collapsed && (
				<div className="window-body">
					<button
						onClick={() => {
							setRegions(new Set(allRegions));
							setStates(new Set(allStates.map((state) => state.code)));
							setText("");
							setSort("pop-asc");
						}}
					>
						Reset Filters
					</button>
					<fieldset style={{ marginBlock: 8 }}>
						<legend>Filter by Region</legend>
						{allRegions.map((region) => (
							<div key={region} className="field-row">
								<input
									id={`region-${region}`}
									type="checkbox"
									checked={regions.has(region)}
									onChange={() =>
										setRegions((regions) => {
											const newRegions = new Set(regions);
											if (newRegions.has(region)) {
												newRegions.delete(region);
											} else {
												newRegions.add(region);
											}
											return newRegions;
										})
									}
								/>
								<label htmlFor={`region-${region}`}>{region}</label>
							</div>
						))}
					</fieldset>

					<fieldset style={{ marginBottom: 8 }}>
						<legend>Filter by State</legend>
						{allStates.map((state) => (
							<div key={state.code} className="field-row">
								<input
									id={`state-${state.code}`}
									type="checkbox"
									checked={states.has(state.code)}
									onChange={() =>
										setStates((states) => {
											const newStates = new Set(states);
											if (newStates.has(state.code)) {
												newStates.delete(state.code);
											} else {
												newStates.add(state.code);
											}
											return newStates;
										})
									}
								/>
								<label htmlFor={`state-${state.code}`}>{state.name}</label>
							</div>
						))}
					</fieldset>

					<div className="field-row-stacked" style={{ width: 200 }}>
						<label htmlFor="city-name">Filter by City Name</label>
						<input
							id="city-name"
							type="text"
							value={text}
							onChange={(e) => setText(e.target.value)}
						/>
					</div>
					<fieldset style={{ marginTop: 8 }}>
						<legend>Sort by</legend>
						{sorts.map((sort) => (
							<div className="field-row" key={sort.id}>
								<input
									id={`sort-${sort.id}`}
									type="radio"
									checked={currentSort === sort.id}
									onChange={() => setSort(sort.id)}
								/>
								<label htmlFor={`sort-${sort.id}`}>{sort.label}</label>
							</div>
						))}
					</fieldset>
				</div>
			)}
		</div>
	);
}
