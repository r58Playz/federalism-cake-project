import { css, type FC } from "dreamland/core";
import { Scene, Transform } from "./3d";
import { Cake, CakeSlice } from "./cake";

function App(this: FC) {
	return (
		<div id="app">
			<Scene perspective={200}>
				<Transform x={0} y={-12} z={0}>
					<Cake radius={20} height={12}>
						<CakeSlice theta={45} offset={0} />
						<CakeSlice theta={315} offset={45} />
					</Cake>
				</Transform>
				<Cake radius={40} height={12}>
					<CakeSlice theta={45} offset={0} />
					<CakeSlice theta={315} offset={45} />
				</Cake>
			</Scene>
		</div>
	);
}
App.style = css`
	:scope {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
`;

document.querySelector("#app")!.replaceWith(<App />);
