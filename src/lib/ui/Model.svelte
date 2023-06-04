<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";
	import { scale } from "svelte/transition";
	import { clickOutside } from "../../utils/clickOutside";
	import Icon from "./Icon.svelte";

	export let title;
	export let open = false;
	export let closable = true;

	const dispatch = createEventDispatcher();
	let el;

	export const modal = {
		open() {
			el.showModal();
		},
		close() {
			el.close();
			dispatch("close");
		},
	};

	onMount(() => {
		if (open) {
			modal.open();
		}
	});

	function onCancel() {
		if (!closable) {
			return;
		}

		modal.close();
	}
</script>

<dialog bind:this={el} on:cancel|preventDefault={onCancel} transition:scale={{ start: 0.8 }}>
	<div use:clickOutside on:click_outside={onCancel}>
		<header>
			{#if title}<h2>{title}</h2>{/if}
			{#if closable}
				<button class="close" on:click={onCancel}><Icon name="close" /></button>
			{/if}
		</header>
		<slot />
	</div>
</dialog>

<style lang="scss">
	@use "src/mixins";

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
		width: 95%;
		color: var(--color-gray-100);
		border: none;
		border-radius: var(--radius-normal);
		background-color: var(--color-gray-500);

		&::backdrop {
			animation: backgroundIn 250ms ease-in-out;
			animation-fill-mode: forwards;
		}

		@include mixins.responsive("small") {
			width: max-content;
			min-width: 25rem;
			max-width: 80%;
		}
	}

	header {
		display: flex;
		justify-content: space-between;

		h2 {
			font-size: 1.2rem;
			font-weight: var(--weight-bold);
			margin: 0 0 0.5rem;
		}

		.close {
			padding: 0;
			background-color: transparent;
			color: var(--color-gray-100);
			border: none;
			cursor: pointer;
		}
	}
</style>
