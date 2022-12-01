import { useToggle } from "./useToggle";
import data from "./combined-cities";
import stateRegions from "./regions.json";
import sorts from "./sorts";
import Toggles from "./Toggles";

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
							setSort("pop-desc");
						}}
					>
						Reset filters
					</button>

					<Toggles
						legend="region"
						choices={allRegions}
						selected={regions}
						setSelected={setRegions}
						// otherwise it gets like hundreds of thousands of pixels tall?
						height={43}
					/>

					<Toggles
						legend="state"
						choices={allStates}
						selected={states}
						setSelected={setStates}
						makeKey={(state) => state.code}
						makeLabel={(state) => {
							const count = data.filter((d) => d.state === state).length;
							return state.name + (count > 1 ? ` (${count})` : "");
						}}
						height={244}
						showClear
					/>

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
