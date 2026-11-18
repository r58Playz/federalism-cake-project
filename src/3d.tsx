import { css, type ComponentChild, type FC } from "dreamland/core";

export function Scene(
	this: FC<
		{
			perspective: number;
			children: ComponentChild;
			x?: number;
			y?: number;
			z?: number;
			zoom?: number;

			forcedPitch?: number;
			forcedYaw?: number;
		},
		{ pitch: number; yaw: number; mouseEnabled: boolean }
	>
) {
	this.pitch = 25;
	this.yaw = 40;
	this.x ??= 0;
	this.y ??= 0;
	this.z ??= 0;
	this.zoom ??= 1;

	let onmove = (e: PointerEvent) => {
		if (this.mouseEnabled) {
			let x = e.movementX,
				y = e.movementY;
			if (this.forcedYaw === undefined) this.yaw += x * 0.5;
			if (this.forcedPitch === undefined)
				this.pitch = Math.min(Math.max(this.pitch + y * 0.5, 0), 90);
		}
	};

	return (
		<div
			class="scene"
			on:pointermove={onmove}
			on:pointerdown={() => (this.mouseEnabled = true)}
			on:pointerup={() => (this.mouseEnabled = false)}
		>
			<div class="camera">
				<div class="camera2">{this.children}</div>
			</div>
		</div>
	);
}
Scene.style = css<typeof Scene>`
	:scope {
		--unit: min(1vw, 1vh);

		perspective: calc(${(self) => use(self.perspective)} * var(--unit));

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
		transform: translateX(calc(${(self) => use(self.x)} * var(--unit)))
			translateY(calc(${(self) => use(self.y)} * var(--unit)))
			translateZ(calc(${(self) => use(self.z)} * var(--unit)))
			scale(${(self) => use(self.zoom)});
		transition: transform 0.3s ease-out;
	}
	.camera2 {
		transform: rotateX(
				${(self) => use(self.pitch, self.forcedPitch).map(([pitch, forced]) => -(forced === undefined ? pitch : forced) + "deg")}
			)
			rotateY(
				${(self) =>
					use(self.yaw, self.forcedYaw).map(([yaw, forced]) => {
						if (forced === undefined) return yaw + "deg";
						// Choose the equivalent forced angle nearest to the drag angle.
						const delta = ((((forced - yaw + 180) % 360) + 360) % 360) - 180;
						return yaw + delta + "deg";
					})}
			);
		transition: transform 0.3s ease-out;
	}
`;

export function Transform(
	this: FC<{ x: number; y: number; z: number; children: ComponentChild }>
) {
	return <div>{this.children}</div>;
}
Transform.style = css`
	:scope {
		transform: translateX(calc(var(--unit) * ${(self) => use(self.x)}))
			translateY(calc(var(--unit) * ${(self) => use(self.y)}))
			translateZ(calc(var(--unit) * ${(self) => use(self.z)}));
	}
`;
