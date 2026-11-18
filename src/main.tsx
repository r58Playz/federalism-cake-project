import { css, type FC } from "dreamland/core";
import { Scene, Transform } from "./3d";
import { Cake, CakeSlice } from "./cake";

let FLAG_RED = "#B31942";
let FLAG_BLUE = "#0A3161";
let STRIPE_HALF_WIDTH = Math.sin((10 * Math.PI) / 180) + "";

function Flag(this: FC<{ poleHeight: number; height: number }>) {
	return (
		<div>
			<div class="pole" />
			<div class="flag">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					width="1235"
					height="650"
					viewBox="0 0 7410 3900"
				>
					<path d="M0,0h7410v3900H0" fill="#b31942" />
					<path
						d="M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0"
						stroke="#FFF"
						stroke-width="300"
					/>
					<path d="M0,0h2964v2100H0" fill="#0a3161" />
					<g fill="#FFF">
						<g id="s18">
							<g id="s9">
								<g id="s5">
									<g id="s4">
										<path
											id="s"
											d="M247,90 317.534230,307.082039 132.873218,172.917961H361.126782L176.465770,307.082039z"
										/>
										<use xlink:href="#s" y="420" />
										<use xlink:href="#s" y="840" />
										<use xlink:href="#s" y="1260" />
									</g>
									<use xlink:href="#s" y="1680" />
								</g>
								<use xlink:href="#s4" x="247" y="210" />
							</g>
							<use xlink:href="#s9" x="494" />
						</g>
						<use xlink:href="#s18" x="988" />
						<use xlink:href="#s9" x="1976" />
						<use xlink:href="#s5" x="2470" />
					</g>
				</svg>
			</div>
		</div>
	);
}
Flag.style = css`
	:scope {
		position: absolute;
		width: 0;
		height: 0;
	}

	.pole {
		position: absolute;
		height: calc(var(--unit) * ${(self) => use(self.poleHeight)});
		width: calc(var(--unit) * 0.5);

		background: #000;
	}

	.flag {
		position: absolute;
		translate: 0 -100%;
		height: calc(var(--unit) * ${(self) => use(self.height)});
		aspect-ratio: 1.9;
	}

	.flag svg {
		position: absolute;
		width: 100%;
		height: 100%;
	}
`;

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

function FederalSlice(this: FC) {
	return (
		<div>
			<div class="court" />
			<div class="house" />
			<div class="senate" />
			<div class="president" />
		</div>
	);
}
FederalSlice.style = css`
	:scope {
		height: 100%;
		width: 100%;

		display: grid;
		gap: calc(var(--unit) * 1.25);

		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		grid-template-areas:
			"court court court"
			"house senate president";

		background: #8b171a;
	}

	.court {
		grid-area: court;

		background: rgb(213, 166, 189);
	}
	.house {
		grid-area: house;

		background: rgb(164, 194, 244);
	}
	.senate {
		grid-area: senate;
		background: rgb(221, 126, 107);
	}
	.president {
		grid-area: president;
		background: rgb(255, 217, 102);
	}
`;

function StateSlice(this: FC) {
	return (
		<div>
			<div class="state" />
			<div class="local" />
		</div>
	);
}
StateSlice.style = css`
	:scope {
		height: 100%;

		display: flex;
		flex-direction: column;
		gap: calc(var(--unit) * 1.25);

		background: #8b171a;
	}
	.state {
		background: rgb(180, 167, 214);
		flex: 2;
	}
	.local {
		background: rgb(182, 215, 168);
		flex: 1;
	}
`;

function App(
	this: FC<
		{},
		{
			open: "top" | "bottom" | null;
		}
	>
) {
	this.open = null;

	let transition = use(this.open).map((x) => x !== null);
	let top = use(this.open).map((x) => x === "top");
	let bottom = use(this.open).map((x) => x === "bottom");

	let bottomColorFn = () => FLAG_BLUE;
	let topColorFn = (theta: number) =>
		Math.abs((theta % 90) - 45) < 10 ? FLAG_RED : "#fff";

	let bottomDivFn = (theta: number) => {
		let x = theta % 20;
		return x === 12.5 ? <Star /> : undefined;
	};

	return (
		<div
			id="app"
			on:contextmenu={(e: Event) => {
				e.preventDefault();
			}}
		>
			<div class="overlay infooverlay">
				<div class="card-container open">
					<div class="card">
						<h1>AP Gov Federalism Cake</h1>
						<p>
							This cake is a model of American dual federalism. It includes two
							layers, with the bottom layer (blue with stars) representing the
							state government and the top layer (white with red stripes)
							representing the federal government. Drag to rotate the cake
							around. Click on the cake slices to learn more.
						</p>
					</div>
				</div>
			</div>
			<div class="overlay cardoverlay">
				<div
					class="card-container"
					class:open={use(this.open).map((x) => x === "top")}
				>
					<div class="card">
						<h2>Federal Level</h2>
						<p>
							At the federal level, separation of powers and checks and balances
							ensure that none of the branches of government have too much
							power. The Supreme Court, represented by the light pink sponge,
							has the final say on interpreting the Constitution and laws
							resulting in it being at the top, above the executive branch,
							House, and Senate. The House, Senate, and President all check each
							other, with the President reviewing and potentially vetoing laws
							approved by Congress. Congress can veto the President's veto with
							a super majority vote as well. The President executes the laws
							passed by Congress, and nominates justices for the Supreme Court
							that are then verified by the Senate. Because of this, the House
							(represented by blue sponge for the Federalists), the Senate
							(represented by red sponge for the Anti-Federalists), and the
							executive branch (represented by gold sponge), are side-by-side
							below the Supreme Court. The sponges are separated by a layer of
							red strawberry jam, representing the strict separation of powers
							while still allowing each branch to check and verify the others.
						</p>
					</div>
				</div>
				<div
					class="card-container"
					class:open={use(this.open).map((x) => x === "bottom")}
				>
					<div class="card">
						<h2>State Level</h2>
						<p>
							At the state level, power is shared between the state and local
							governments. The state can manage reserved powers like education,
							elections, criminal/civil law, or licensing. However, execution of
							these reserved powers is often handled by the local governments.
							For example, states create standards and regulations for education
							and local school districts handle following these regulations and
							running schools. Since local governments still follow and execute
							state laws, the lavender sponge representing state government has
							a larger share than the green sponge representing local
							government. The sponges are separated by a layer of red strawberry
							jam, showing that local government still has some autonomy in
							execution of laws.
						</p>
					</div>
				</div>
			</div>
			<Scene
				perspective={200}
				x={transition.and(-70).or(25)}
				y={transition.and(-10).or(-5)}
				zoom={transition.and(2.5).or(1.3)}
				forcedPitch={transition.and(10).or(undefined)}
				forcedYaw={transition.and(40).or(undefined)}
			>
				<Transform x={0} y={-20} z={0}>
					<Flag poleHeight={5} height={5} />
				</Transform>
				<div class="cake top">
					<Transform x={0} y={-15} z={0}>
						<Cake radius={30} height={15}>
							<CakeSlice
								sideColor={topColorFn}
								theta={45}
								offset={0}
								out={top.and(30).or(2)}
								on:click={() => (this.open = top.value ? null : "top")}
							>
								<div class="top" />
								<div class="bottom" />
								<FederalSlice />
								<FederalSlice />
							</CakeSlice>
							<CakeSlice sideColor={topColorFn} theta={315} offset={45}>
								<div class="top" />
								<div class="bottom" />
								<FederalSlice />
								<FederalSlice />
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
							out={bottom.and(30).or(2)}
							on:click={() => (this.open = bottom.value ? null : "bottom")}
						>
							<div class="top" />
							<div class="bottom" />
							<StateSlice />
							<StateSlice />
						</CakeSlice>
						<CakeSlice
							sideColor={bottomColorFn}
							sideEl={bottomDivFn}
							theta={315}
							offset={45}
						>
							<div class="top" />
							<div class="bottom" />
							<StateSlice />
							<StateSlice />
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

		z-index: 99999;
		pointer-events: none;
	}

	.infooverlay {
		width: 40vw;
		top: 0;
		left: 0;
	}

	.cardoverlay {
		width: 47.5vw;
		bottom: 0;
		left: 0;
	}

	.cardoverlay .card-container {
		bottom: 0;
	}

	.card-container {
		position: absolute;
		padding: 1rem;

		opacity: 0;
		transition: opacity 0.3s ease;
	}
	.card {
		display: flow-root;
		height: 100%;

		border-radius: 1rem;
		padding: 0 1rem;

		background: #222;
		color: #fff;
	}
	.card :is(h1, h2) {
		margin: 1rem 0;
	}

	.open {
		opacity: 1;
	}
`;

document.querySelector("#app")!.replaceWith(<App />);
