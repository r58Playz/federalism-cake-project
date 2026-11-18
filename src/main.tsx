import { css, type FC } from "dreamland/core";
import { Scene, Transform } from "./3d";
import { Cake, CakeSlice } from "./cake";

let FLAG_RED = "#B31942";
let FLAG_BLUE = "#0A3161";

function App(
	this: FC<
		{},
		{
			topOpen: boolean;
			bottomOpen: boolean;
			lastOpened: "top" | "bottom" | null;
		}
	>
) {
	this.topOpen = false;
	this.bottomOpen = false;
	this.lastOpened = null;

	let transition = use(this.topOpen, this.bottomOpen).map(([a, b]) => a || b);

	let bottomColorFn = (theta) => {
		return FLAG_BLUE;
	};
	let topColorFn = (theta) => {
		let mod90 = theta % 90;
		if (mod90 >= 35 && mod90 <= 55) return FLAG_RED;
		return "#fff";
	};

	return (
		<div
			id="app"
			on:contextmenu={(e) => {
				e.preventDefault();
			}}
		>
			<div class="overlay">
				<div
					class="card-container"
					class:open={use(this.topOpen)}
					class:front={use(this.lastOpened).map((level) => level === "top")}
				>
					<div class="card">
						<h1>Federal Level</h1>
					</div>
				</div>
				<div
					class="card-container"
					class:open={use(this.bottomOpen)}
					class:front={use(this.lastOpened).map((level) => level === "bottom")}
				>
					<div class="card">
						<h1>State Level</h1>
					</div>
				</div>
			</div>
			<Scene
				perspective={200}
				x={transition.and(-70).or(0)}
				y={transition.and(-10).or(0)}
				zoom={transition.and(2.5).or(1.3)}
				forcedPitch={transition.and(10).or(undefined)}
				forcedYaw={transition.and(40).or(undefined)}
			>
				<div class="cake top">
					<Transform x={0} y={-15} z={0}>
						<Cake radius={30} height={15}>
							<CakeSlice
								sideColor={topColorFn}
								theta={45}
								offset={0}
								out={use(this.topOpen).and(30).or(2)}
								on:click={() => {
									this.topOpen = !this.topOpen;
									if (this.topOpen) this.lastOpened = "top";
								}}
							>
								<div class="top" />
								<div class="bottom" />
								<div class="left" />
								<div class="right" />
							</CakeSlice>
							<CakeSlice sideColor={topColorFn} theta={315} offset={45}>
								<div class="top" />
								<div class="bottom" />
								<div class="left" />
								<div class="right" />
							</CakeSlice>
						</Cake>
					</Transform>
				</div>
				<div class="cake bottom">
					<Cake radius={40} height={12}>
						<CakeSlice
							sideColor={bottomColorFn}
							theta={45}
							offset={0}
							out={use(this.bottomOpen).and(30).or(2)}
							on:click={() => {
								this.bottomOpen = !this.bottomOpen;
								if (this.bottomOpen) this.lastOpened = "bottom";
							}}
						>
							<div class="top" />
							<div class="bottom" />
							<div class="left" />
							<div class="right" />
						</CakeSlice>
						<CakeSlice sideColor={bottomColorFn} theta={315} offset={45}>
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
		height: 100%;
		position: relative;
	}

	:scope > :global(.scene) {
		height: 100%;
	}

	.cake :is(.top, .bottom, .left, .right) {
		width: 100%;
		height: 100%;
	}

	.cake.top .top {
		background: repeating-conic-gradient(
			from var(--slice-offset),
			#fff 0deg 34.95deg,
			${FLAG_RED} 35.05deg 54.95deg,
			#fff 55.05deg 90deg
		);
	}
	.cake.bottom .top {
		background: ${FLAG_BLUE};
	}

	.cake .bottom {
		background: #000;
	}

	.overlay * {
		box-sizing: border-box;
	}
	.overlay {
		position: absolute;
		width: 45vw;
		height: 90vh;
		bottom: 0;
		left: 0;
		z-index: 99999;
		pointer-events: none;
	}

	.card-container {
		position: absolute;
		inset: 0;

		padding: 1rem;

		opacity: 0;
		transition: opacity 0.3s ease;
	}
	.card {
		height: 100%;

		border-radius: 1rem;
		padding: 2rem;

		background: #222;
		color: #fff;
	}
	.card h1 {
		margin: 0;
	}

	.open {
		opacity: 1;
	}

	.front {
		z-index: 1;
	}
`;

document.querySelector("#app")!.replaceWith(<App />);
