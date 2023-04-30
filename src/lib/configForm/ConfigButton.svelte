<script lang="ts">
	export let icon = "";
</script>

<button on:click>
	{#if icon}
		<i class={"fa fa-"+icon}></i>
	{/if}

	<slot></slot>
</button>

<style lang="scss">
	button {
		width: 100%;
		padding: 0.5rem;
		cursor: pointer;
		color: var(--color-gray-100);
		border: 2px solid var(--color-gray-500);
		border-radius: var(--radius-normal);
		background: var(--color-gray-500);

		&:focus-visible {
			border-color: var(--color-primary);
			outline: none;
		}

		i {
			margin-right: 0.4rem;
		}
	}
</style>
