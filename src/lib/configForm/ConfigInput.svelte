<script lang="ts">
	import {debounce} from "radash";
	import {createEventDispatcher} from "svelte";

	const dispatch = createEventDispatcher();
	export let label = "";
	export let value = "";

	function onInput() {
		dispatch("input", value)
	}
</script>

<label>
	<span>{label}</span>

	<input bind:value on:input={debounce({ delay: 250}, onInput)} type="text">
</label>

<style lang="scss">
	span {
		font-size: 0.9rem;
		display: block;
		margin-bottom: 0.2rem;
		color: hsl(0deg 0% 100% / 60%)
	}

	input {
		width: 100%;
		padding: 0.5rem;
		color: white;
		border: 2px solid hsl(0deg 0% 100% / 10%);
		border-radius: 5px;
		background: hsl(0deg 0% 100% / 5%);

		&:focus {
			outline: none;
		}
	}
</style>
