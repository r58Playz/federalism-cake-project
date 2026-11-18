import { css, type FC } from "dreamland/core";
import { Scene, Transform } from "./3d";
import { Cake, CakeSlice } from "./cake";

let FLAG_RED = "#B31942";
let FLAG_BLUE = "#0A3161";
let STRIPE_HALF_WIDTH = Math.sin((10 * Math.PI) / 180);

function Star(this: FC) {
	return (
		<div>
			<div class="root">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="400"
					height="400"
					viewBox="-0.035 -0.035 0.07 0.07"
				>
					<defs>
						<polygon
							id="pt"
							points="-0.1624598481164531,0 0,-0.5 0.1624598481164531,0"
							transform="scale(0.0616)"
							fill="#FFF"
						/>
					</defs>
					<use href="#pt" transform="rotate(-144)" />
					<use href="#pt" transform="rotate(-72)" />
					<use href="#pt" />
					<use href="#pt" transform="rotate(72)" />
					<use href="#pt" transform="rotate(144)" />
				</svg>
			</div>
		</div>
	);
}
Star.style = css`
	:scope {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, 1fr);
		place-items: center;
	}
	.root {
		width: calc(var(--unit) * 10);
		height: calc(var(--unit) * 10);

		transform: translateZ(1px);
	}
	svg {
		width: 100%;
		height: 100%;
	}
`;

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

	let bottomColorFn = (theta: number) => FLAG_BLUE;
	let topColorFn = (theta: number) =>
		Math.abs((theta % 90) - 45) < 10 ? FLAG_RED : "#fff";

	let bottomDivFn = (theta: number) => {
		let x = theta % 20;
		return x === 12.5 ? <Star /> : undefined;
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
							sideEl={bottomDivFn}
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
						<CakeSlice
							sideColor={bottomColorFn}
							sideEl={bottomDivFn}
							theta={315}
							offset={45}
						>
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
		--stripe-half-width: calc(var(--cake-radius) * ${STRIPE_HALF_WIDTH});
		--stripe:
			transparent calc(50% - var(--stripe-half-width) - 0.5px),
			${FLAG_RED} calc(50% - var(--stripe-half-width) + 0.5px)
				calc(50% + var(--stripe-half-width) - 0.5px),
			transparent calc(50% + var(--stripe-half-width) + 0.5px);
		background:
			linear-gradient(calc(45deg + var(--slice-offset)), var(--stripe)),
			linear-gradient(calc(135deg + var(--slice-offset)), var(--stripe)), #fff;
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
