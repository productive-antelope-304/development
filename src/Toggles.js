export default function Toggles({
	legend,
	choices,
	selected,
	setSelected,
	makeKey = (x) => x,
	makeLabel = (x) => x,
	height,
	showClear = false,
}) {
	return (
		<fieldset style={{ marginBlock: 8, height }}>
			<legend>Filter by {legend}</legend>
			<div style={{ columnCount: 2 }}>
				{choices.map((value) => {
					const key = makeKey(value);
					return (
						<div key={key} className="field-row">
							<input
								id={`${legend}-${key}`}
								type="checkbox"
								checked={selected.has(key)}
								onChange={() =>
									setSelected((values) => {
										const newValues = new Set(values);
										if (newValues.has(key)) {
											newValues.delete(key);
										} else {
											newValues.add(key);
										}
										return newValues;
									})
								}
							/>
							<label htmlFor={`${legend}-${key}`}>{makeLabel(value)}</label>
						</div>
					);
				})}
			</div>
			{showClear && (
				<button
					style={{
						marginTop: -8,
						marginLeft: "calc(50% + 6px)",
						display: "block",
					}}
					onClick={() => {
						setSelected(new Set());
					}}
				>
					Select none
				</button>
			)}
		</fieldset>
	);
}
