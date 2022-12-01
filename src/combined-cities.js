import cities from "./cities.json";
import stateRegions from "./regions.json";

export default cities.map((c) => ({
	...c,
	state: stateRegions.find((r) => r.code === c.state),
}));
