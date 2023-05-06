<script lang="ts">
	import {mapColor} from "../../utils/colorMapper";

	export let id = 0;
	export let color = "";
	export let waveform = '';
	export let isPlaying = false;
	export let isLoading = true;
	export let isFading = false;
	export let progress = 0;
	export let loop = false;
</script>

<button
 class:isFading
 class:isLoading
 class:isPlaying
 data-soundid={id}
 on:click|stopPropagation
 style:--color={mapColor(color)}
 style:--progress={progress+"%"}
>
	<span class="progress"></span>
	<span class="soundwave" style:background-image={`url("${waveform}")`}></span>
	<span class="label">
		<slot></slot>
	</span>
	<!-- <span class="shortcut">E</span> -->
	{#if loop}
		<i class="loop fa fa-rotate-left"></i>
	{/if}
</button>

<style lang="scss">
	button {
		font-family: inherit;
		font-weight: 500;
		position: relative;

		overflow: clip;
		padding: 0.6em 1.2em;
		cursor: pointer;
		color: var(--color-gray-100);
		border: 2px solid transparent;
		border-radius: 8px;
		background-color: var(--color-gray-900);
		container-type: inline-size;
		--progress: 0%;
		aspect-ratio: 20 / 9;

		.soundwave {
			position: absolute;
			width: 100%;
			background-size: contain;
			inset: 0;
			background-blend-mode: color-burn;
		}

		&.isLoading {
			opacity: 0.5;
		}

		&.isPlaying {
			border-color: var(--color, var(--color-primary));
		}

		&.isFading {
			border-color: yellow;
		}
	}

	.loop {
		position: absolute;
		top: 0.2rem;
		right: 0.2rem;
		color: var(--color, var(--color-primary));
		mix-blend-mode: difference;
	}

	.progress {
		position: absolute;
		background: linear-gradient(90deg, var(--color, var(--color-primary)) var(--progress, 0%), transparent var(--progress, 0%));
		inset: 0;
	}

	.label {
		font-size: 10cqmin;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.4rem;
		color: var(--color, var(--color-primary));
		inset: 0;
		mix-blend-mode: difference;
	}

	.shortcut {
		font-size: 0.8rem;
		position: absolute;
		top: 0.4rem;
		left: 0.4rem;
		padding: 0.1rem 0.6rem;
		border-radius: var(--radius-normal);
		background-color: var(--color);
	}
</style>
