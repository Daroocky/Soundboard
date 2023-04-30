<script lang="ts">
	export let label = "";
	export let value = "";

</script>

<label>
	<span>{label}</span>

	<input bind:value on:input type="text">
</label>

<style lang="scss">
	span {
		font-size: 0.9rem;
		display: block;
		margin-bottom: 0;
		color: var(--color-gray-400);
	}

	input {
		font-size: 0.9rem;
		width: 100%;
		padding: 0.5rem;
		color: var(--color-gray-100);
		border: 2px solid var(--color-gray-500);
		border-radius: var(--radius-normal);
		background: var(--color-gray-700);

		&:focus-visible {
			border-color: var(--color-primary);
			outline: none;
		}
	}
</style>
