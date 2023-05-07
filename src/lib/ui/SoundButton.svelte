<script lang="ts">
	import {mapAccentColor, mapColor} from "../../utils/colorMapper";
	import Icon from "./Icon.svelte";

	export let id = 0;
	export let color = "";
	export let waveform = '';
	export let shortcut;
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
 style:--color-accent={mapAccentColor(color)}
 style:--progress={progress+"%"}
>
	<span class="progress"></span>
	<span class="soundwave" style:--waveform={`url("${waveform}")`}></span>
	<span class="content">
		<span class="label">
			<slot></slot>
		</span>
		{#if shortcut}
			<span class="shortcut">{shortcut}</span>
		{/if}
		{#if loop}
			<span class="settings">
				<Icon name="laps" />
			</span>
		{/if}
	</span>

</button>

<style lang="scss">
	button {
		position: relative;

		cursor: pointer;
		transition: opacity 500ms ease-in-out;
		color: var(--color-gray-100);
		border: 2px solid transparent;
		border-radius: 8px;
		background-color: var(--color-gray-900);
		container-type: inline-size;
		--progress: 0%;
		aspect-ratio: 20 / 9;

		&.isLoading {
			opacity: 0.5;
		}

		&.isPlaying {
			border-color: var(--color, var(--color-primary));
		}

	}

	.progress {
		position: absolute;
		background: linear-gradient(90deg, var(--color, var(--color-primary)) var(--progress, 0%), transparent var(--progress, 0%));
		inset: 0;
	}

	.soundwave {
		position: absolute;
		width: 100%;
		transition: all 1s ease-in-out;

		background-color: var(--color-accent);
		inset: 0;
		mask-image: var(--waveform);
		-webkit-mask-image: var(--waveform);

		mask-size: cover;
		-webkit-mask-size: cover;

		mask-position: center;
		-webkit-mask-position: center;

		mask-repeat: no-repeat;
		-webkit-mask-repeat: no-repeat;
	}

	.content {
		position: absolute;
		display: grid;
		padding: 2cqmin;
		grid-template-columns: 1fr 10cqmin 1fr;
		grid-template-rows: 8cqmin 1fr 8cqmin;
		grid-template-areas:
    "label label label"
    ". . ."
    "settings shortcut timer";

		inset: 0;

		.label {
			grid-area: label;
		}

		.shortcut {
			grid-area: shortcut;
		}

		.settings {
			grid-area: settings;
		}

		.timer {
			grid-area: timer;
		}
	}

	.settings {
		font-size: 8cqmin;
		line-height: 0;
		display: flex;
		justify-content: start;
		color: var(--color, var(--color-primary));
		mix-blend-mode: difference;
	}

	.label {
		font-size: 7cqmin;
		line-height: 1;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: var(--color, var(--color-primary));
		mix-blend-mode: difference;
	}

	.shortcut {
		font-size: 4cqmin;
		font-weight: var(--weight-bold);
		display: grid;
		align-content: center;
		border-radius: var(--radius-normal);
		background-color: var(--color-accent);
	}
</style>
