import { css, type ComponentChild, type FC } from "dreamland/core";

export function Cake(
	this: FC<{ radius: number; height: number; children: ComponentChild }>
) {
	return <div>{this.children}</div>;
}
Cake.style = css`
	:scope {
		display: grid;
		place-items: center;

		--cake-radius: calc(var(--unit) * ${(self) => use(self.radius)});
		--cake-height: calc(var(--unit) * ${(self) => use(self.height)});
	}
`;

let COUNT = 360;
let ANGLE = (2 * Math.PI) / COUNT;
let ANGLE_CSS = `${ANGLE}rad`;
let SIDE_WIDTH_CSS = `${2 * Math.sin(ANGLE / 2)}`;
let SIDE_RADIUS_CSS = `${Math.cos(ANGLE / 2)}`;

let polygon = (count: number) => {
	let polygon = "";
	for (let i = 0; i <= count; i++) {
		let theta = ANGLE * i;

		polygon += `${(50 + Math.sin(theta) * 50).toFixed(2)}% ${(50 + Math.cos(theta) * 50).toFixed(2)}%, `;
	}
	return `polygon(50% 50%, ${polygon} 50% 50%)`;
};

export function CakeSlice(
	this: FC<{
		theta: number;
		offset: number;
		children: [ComponentChild, ComponentChild, ComponentChild, ComponentChild];
		sideColor: string;
	}>
) {
	return (
		<div>
			<div class="top">{this.children[0]}</div>
			<div class="bottom">{this.children[1]}</div>
			<div class="wall left">{this.children[2]}</div>
			<div class="wall right">{this.children[3]}</div>
			{use(this.theta).map((x) =>
				Array.from(Array(x), (_, i) => (
					<div class="side" style={{ "--i": this.offset + i }} />
				))
			)}
		</div>
	);
}
CakeSlice.style = css`
	:scope {
		position: relative;
		width: 0;
		height: 0;
	}
	:scope * {
		position: absolute;
		top: 0;
		left: 0;
	}

	.top,
	.bottom {
		background: #f0f5;
		width: calc(var(--cake-radius) * 2);
		aspect-ratio: 1 / 1;
		transform-origin: 0 0;

		clip-path: ${(self) => use(self.theta).map(polygon)};
	}
	.top {
		transform: rotateX(90deg)
			rotateZ(calc(${ANGLE_CSS} * ${(self) => use(self.offset)} * -1))
			translateX(calc(var(--cake-radius) * -1))
			translateY(calc(var(--cake-radius) * -1));
	}
	.bottom {
		transform: rotateX(90deg)
			rotateZ(calc(${ANGLE_CSS} * ${(self) => use(self.offset)} * -1))
			translateX(calc(var(--cake-radius) * -1))
			translateY(calc(var(--cake-radius) * -1))
			translateZ(calc(var(--cake-height) * -1));
	}

	.side {
		background: ${(self) => use(self.sideColor)};
		width: calc(var(--cake-radius) * ${SIDE_WIDTH_CSS});
		padding: 0 1px;
		height: var(--cake-height);
		transform-origin: 0 0;
		transform: rotateY(calc(${ANGLE_CSS} * (var(--i) + 0.5)))
			translateZ(calc(var(--cake-radius) * ${SIDE_RADIUS_CSS})) translateX(-50%);
	}

	.wall {
		width: calc(var(--cake-radius) - 1px);
		height: var(--cake-height);
		transform-origin: 0 0;
	}
	.wall.left {
		transform: rotateY(
			calc(${ANGLE_CSS} * ${(self) => use(self.offset)} - 90deg)
		);
		background: #f00;
	}
	.wall.right {
		background: #00f;
		transform: rotateY(
			calc(
				${ANGLE_CSS} *
					${(self) => use(self.offset, self.theta).map(([a, b]) => a + b)} -
					90deg
			)
		);
	}
`;
