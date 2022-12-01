import "./Admonition.css";
import { useEffect } from "react";

export default function Admonition({ onReset }) {
	useEffect(() => {
		document.body.classList.add("bought");
		return () => {
			document.body.classList.remove("bought");
		};
	}, []);
	return (
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
				{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
				<a
					// eslint-disable-next-line no-script-url
					href="javascript:void(0)"
					onClick={onReset}
					style={{
						filter: "invert() hue-rotate(180deg)",
						textDecorationSkip: "none",
					}}
				>
					i'm sorry
				</a>
			</p>
		</div>
	);
}
