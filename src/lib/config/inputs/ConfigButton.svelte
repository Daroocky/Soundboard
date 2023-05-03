<script lang="ts">
	import Icon from "../../ui/Icon.svelte";

	export let icon = "";
	export let disabled = false;
	export let danger = false
</script>

<button class:danger {disabled} on:click on:focusout on:pointerleave>
	{#if icon}
		<Icon name={icon} />
	{/if}

	<span><slot></slot></span>
</button>

<style lang="scss">
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 0.5rem;
		cursor: pointer;
		color: var(--color-gray-100);
		border: 2px solid var(--color-gray-500);
		border-radius: var(--radius-normal);
		background: var(--color-gray-500);
		gap: 0.4rem;

		&.danger {
			color: var(--color-gray-900);
			border-color: var(--color-red);
			background-color: var(--color-red);
		}

		&[disabled] {
			opacity: 0.5;
		}

		&:focus-visible {
			border-color: var(--color-primary);
			outline: none;
		}
	}
</style>
