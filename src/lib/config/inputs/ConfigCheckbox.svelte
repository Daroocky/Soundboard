<script lang="ts">
	import {createEventDispatcher} from "svelte";

	const dispatch = createEventDispatcher();
	export let label = "";
	export let value = "";

	function onInput() {
		dispatch("input", value)
	}
</script>

<label>
	<input bind:checked={value} on:input type="checkbox">

	<span>{label}</span>
</label>

<style lang="scss">
	span {
		display: block;
		margin-bottom: 0;
		color: var(--color-gray-100);
	}

	label {
		font-size: 1rem;
		line-height: normal;
		display: flex;
		align-items: center;
		width: 100%;
		height: 2.4rem;
		padding: 0.5rem;
		cursor: pointer;
		border: 2px solid var(--color-gray-500);
		border-radius: var(--radius-normal);
		background: var(--color-gray-500);

		gap: 0.5rem;

		&:focus-within:has(:focus-visible) {
			border-color: var(--color-primary);
			outline: none;
		}
	}

	input {
		position: relative;
		width: 2rem;
		height: 1rem;
		margin: 0;
		transition: background-color 250ms ease-in-out;
		border: 2px solid transparent;
		border-radius: 50px;
		outline: none;
		background-color: var(--color-gray-400);
		-webkit-appearance: none;
	}

	input:after {
		position: absolute;
		height: 100%;
		content: "";
		transition: translate 250ms ease-in-out;
		border-radius: 50%;
		background: #fff;
		box-shadow: 0 0 5px hsl(0deg 0% 0% / 10%);
		aspect-ratio: 1 / 1;
	}

	input:checked {
		background-color: var(--color-primary);
	}

	input:checked:after {
		translate: 1rem 0;
	}
</style>
