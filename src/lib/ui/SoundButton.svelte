<script lang="ts">
	import {mapColor} from "../../utils/colorMapper";

	export let color = "";
	export let isPlaying = false;
	export let isLoading = true;
	export let isFading = false;
	export let progress = 0;
</script>

<button
 class:isFading
 class:isLoading
 class:isPlaying
 on:click|stopPropagation
 style:--color={mapColor(color)}
 style:--progress={progress+"%"}
>
	<span class="progress"></span>
	<span class="label">
		<slot></slot>
	</span>
</button>

<style lang="scss">
	button {
		font-family: inherit;
		font-size: 1em;
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
	}

	.isLoading {
		opacity: 0.5;
	}

	button.isPlaying {
		border-color: var(--color, var(--color-primary));
	}

	button.isFading {
		border-color: yellow;
	}

	.progress {
		position: absolute;
		background: linear-gradient(90deg, var(--color, var(--color-primary)) var(--progress, 0%), transparent var(--progress, 0%));
		inset: 0;
	}

	.label {
		font-size: 1.2rem;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color, var(--color-primary));
		inset: 0;
		mix-blend-mode: difference;
	}
</style>
