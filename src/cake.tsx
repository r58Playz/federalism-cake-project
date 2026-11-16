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
let ANGLE_CSS = `${ANGLE.toFixed(8)}rad`;
let TAN_ANGLE_CSS = `${(2 * Math.tan(ANGLE / 2)).toFixed(8)}`;

export function CakeSlice(this: FC<{ theta: number; offset: number }>) {
	return (
		<div>
			<div class="wall left" />
			<div class="wall right" />
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

	.side {
		background: #000;
		width: calc(var(--cake-radius) * ${TAN_ANGLE_CSS});
		padding: ${(COUNT * 0.0005).toFixed(8)}px;
		height: var(--cake-height);
		transform: rotateY(calc(${ANGLE_CSS} * var(--i)))
			translateZ(var(--cake-radius));
	}

	.wall {
		width: var(--cake-radius);
		height: var(--cake-height);
		transform-origin: 0 -50%;
		padding: 0 calc(var(--unit) * 0.1);
	}
	.wall.left {
		transform: rotateY(
			calc(${ANGLE_CSS} * ${(self) => use(self.offset).map((x) => x - 90)})
		);
		background: #f00;
	}
	.wall.right {
		background: #00f;
		transform: rotateY(
			calc(
				${ANGLE_CSS} *
					${(self) => use(self.offset, self.theta).map(([a, b]) => a + b - 90)}
			)
		);
	}
`;
