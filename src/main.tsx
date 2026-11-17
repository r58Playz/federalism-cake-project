import { css, type FC } from "dreamland/core";
import { Scene, Transform } from "./3d";
import { Cake, CakeSlice } from "./cake";

function App(this: FC) {
	return (
		<div
			id="app"
			on:contextmenu={(e) => {
				e.preventDefault();
			}}
		>
			<Scene perspective={200}>
				<div class="top">
					<Transform x={0} y={-12} z={0}>
						<Cake radius={30} height={12}>
							<CakeSlice sideColor="#000" theta={45} offset={0}>
								<div class="top" />
								<div class="bottom" />
								<div class="left" />
								<div class="right" />
							</CakeSlice>
							<CakeSlice sideColor="#000" theta={315} offset={45}>
								<div class="top" />
								<div class="bottom" />
								<div class="left" />
								<div class="right" />
							</CakeSlice>
						</Cake>
					</Transform>
				</div>
				<div class="bottom">
					<Cake radius={40} height={12}>
						<CakeSlice sideColor="#000" theta={45} offset={0}>
							<div class="top" />
							<div class="bottom" />
							<div class="left" />
							<div class="right" />
						</CakeSlice>
						<CakeSlice sideColor="#000" theta={315} offset={45}>
							<div class="top" />
							<div class="bottom" />
							<div class="left" />
							<div class="right" />
						</CakeSlice>
					</Cake>
				</div>
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
