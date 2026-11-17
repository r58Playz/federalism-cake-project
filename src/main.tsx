import { css, type FC } from "dreamland/core";
import { Scene, Transform } from "./3d";
import { Cake, CakeSlice } from "./cake";

function App(
	this: FC<
		{},
		{
			topOpen: boolean;
			bottomOpen: boolean;
		}
	>
) {
	this.topOpen = false;
	this.bottomOpen = false;

	let transition = use(this.topOpen, this.bottomOpen).map(([a, b]) => a || b);

	return (
		<div
			id="app"
			on:contextmenu={(e) => {
				e.preventDefault();
			}}
		>
			<div class="overlay">
				<div class="card-container" class:open={use(this.topOpen)}>
					<div class="card">
						<h1>Federal Level</h1>
					</div>
				</div>
				<div class="card-container" class:open={use(this.bottomOpen)}>
					<div class="card">
						<h1>State Level</h1>
					</div>
				</div>
			</div>
			<Scene
				perspective={200}
				x={transition.and(-70).or(0)}
				y={transition.and(-10).or(0)}
				zoom={transition.and(2.5).or(1)}
				forcedPitch={transition.and(10).or(undefined)}
				forcedYaw={transition.and(40).or(undefined)}
			>
				<div class="top">
					<Transform x={0} y={-12} z={0}>
						<Cake radius={30} height={12}>
							<CakeSlice
								sideColor="#000"
								theta={45}
								offset={0}
								out={use(this.topOpen).and(30).or(2)}
								on:click={() => {
									this.topOpen = !this.topOpen;
								}}
							>
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
						<CakeSlice
							sideColor="#000"
							theta={45}
							offset={0}
							out={use(this.bottomOpen).and(30).or(2)}
							on:click={() => {
								this.bottomOpen = !this.bottomOpen;
							}}
						>
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
		height: 100%;
		position: relative;
	}

	:scope > :global(.scene) {
		height: 100%;
	}

	.overlay * {
		box-sizing: border-box;
	}
	.overlay {
		position: absolute;
		width: 40vw;
		height: 80vh;
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
		transition: opacity 0.5s ease;
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
`;

document.querySelector("#app")!.replaceWith(<App />);
