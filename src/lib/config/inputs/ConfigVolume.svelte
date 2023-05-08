<script lang="ts">
	import Icon from "../../ui/Icon.svelte";

	export let label = "";
	export let value = "";

	export let min = 0;
	export let max = 100;
</script>

<label>
	<span class="label">{label}</span>

	<span class="slider">
		<Icon name={value > min ? "volume_up" : "volume_off"} />
		<input bind:value {max} {min} name="" on:input style:--progress={`${value / max * 100}%`} type="range">
		<span class="value">{value}%</span>
	</span>
</label>

<style lang="scss">
	.label {
		font-size: 0.9rem;
		display: block;
		margin-bottom: 0;
		color: var(--color-gray-400);
	}

	.slider {
		display: flex;
		overflow: hidden;

		align-items: center;
		width: 100%;
		height: 2.4rem;
		padding: 0.5rem;
		color: var(--color-gray-100);
		border: 2px solid var(--color-gray-500);

		border-radius: var(--radius-normal);

		background: var(--color-gray-500);

		gap: 0.4rem;

		&:focus-within:has(:focus-visible) {
			border-color: var(--color-primary);
			outline: none;
		}
	}

	input[type="range"] {
		width: 100%;
		height: 1rem;
		cursor: pointer;

		border: 2px solid var(--color-gray-500);

		border-radius: var(--radius-normal);

		-webkit-appearance: none;
		appearance: none;

		&:focus-visible {
			outline: 0;
		}

		&::-webkit-slider-runnable-track {
			height: 100%;
			border-radius: var(--radius-small);
			background: linear-gradient(to right, var(--color-primary) var(--progress, 0%), var(--color-gray-400) var(--progress, 0%));
		}

		//&::-moz-range-track

		&::-webkit-slider-thumb {
			width: 1rem;
			height: 100%;
			cursor: pointer;
			appearance: none;
		}

		//&::-moz-range-thumb
	}

	.value {
		width: 3.5rem;
		text-align: right;
	}
</style>
