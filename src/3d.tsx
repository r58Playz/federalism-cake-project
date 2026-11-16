import { css, type ComponentChild, type FC } from "dreamland/core";

export function Scene(this: FC<{ perspective: number, children: ComponentChild }, { pitch: number, yaw: number, mouseEnabled: boolean }>) {
	this.pitch = 40;
	this.yaw = 0;

	let onmove = (e: PointerEvent) => {
		if (this.mouseEnabled) {
			let x = e.movementX, y = e.movementY;
			this.yaw += x * 0.5;
			this.pitch = Math.min(Math.max(this.pitch + y * 0.5, 0), 90);
		}
	};

	return (
		<div on:pointermove={onmove} on:pointerdown={() => this.mouseEnabled = true} on:pointerup={() => this.mouseEnabled = false}>
			<div class="camera">
				{this.children}
			</div>
		</div>
	)
}
Scene.style = css`
	:scope {
		--unit: min(1vw, 1vh);

		perspective: calc(${self => use(self.perspective)} * var(--unit));

		flex: 1;
		background: #ddd;

		display: grid;
		place-items: center;

		user-select: none;
		touch-action: none;
		overflow: hidden;
	}

	:scope :global(*) {
		transform-style: preserve-3d;
	}

	.camera {
		transform: rotateX(${self => use(self.pitch).map(x=>(-x).toFixed(2) + "deg")}) rotateY(${self => use(self.yaw).map(x=>x.toFixed(2) + "deg")});
	}
`;

export function Transform(this: FC<{ x: number, y: number, z: number, children: ComponentChild }>) {
	return <div>{this.children}</div>;
}
Transform.style = css`
	:scope {
		transform: 
			translateX(calc(var(--unit) * ${self => use(self.x)}))
			translateY(calc(var(--unit) * ${self => use(self.y)}))
			translateZ(calc(var(--unit) * ${self => use(self.z)}));
	}
`;
