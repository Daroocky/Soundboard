<script lang="ts">
	import { onMount } from "svelte";
	import { scale } from "svelte/transition";

	export let title;
	let el;

	export const modal = {
		open() {
			el.showModal();
		},
		close() {
			el.close();
		},
	};

	onMount(() => {
		modal.open();
	});
</script>

<dialog bind:this={el} on:cancel|preventDefault transition:scale={{ start: 0.8 }}>
	{#if title}<h2>{title}</h2>{/if}
	<slot />
</dialog>

<style lang="scss">
	@keyframes backgroundIn {
		from {
			background-color: hsla(0, 0%, 0%, 0%);
			backdrop-filter: blur(0px);
		}

		to {
			background-color: hsla(0, 0%, 0%, 40%);
			backdrop-filter: blur(5px);
		}
	}

	dialog {
		min-width: 24rem;
		color: var(--color-gray-100);
		border: none;
		border-radius: var(--radius-normal);
		background-color: var(--color-gray-500);

		&::backdrop {
			animation: backgroundIn 250ms ease-in-out;
			animation-fill-mode: forwards;
		}
	}

	h2 {
		font-size: 1.2rem;
		font-weight: var(--weight-bold);
		margin: 0 0 0.5rem;
	}
</style>
