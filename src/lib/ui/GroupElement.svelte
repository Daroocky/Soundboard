<script lang="ts">
	import Icon from "./Icon.svelte";

	export let title = "";
	export let selected = false;
	export let interactable = false;
</script>

<section class:interactable class:selected on:click|stopPropagation>
	{#if interactable}
		<div class="handle" on:click|stopPropagation={() => false}><Icon name="drag_indicator" /></div>
	{/if}

	<h2>{title}</h2>
	<div class="content">
		<slot />
	</div>
</section>

<style lang="scss">
	@use "src/mixins";

	.handle {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		bottom: 0.5rem;
		cursor: grab;
		font-size: 1.2rem;
		display: flex;
		align-items: center;
	}

	section {
		position: relative;
		padding: 0.5rem;
		border: 2px solid transparent;
		border-radius: var(--radius-normal);
		background-color: var(--color-gray-700);

		container-type: inline-size;

		@include mixins.responsive("small") {
			padding: 1rem;
		}

		&.interactable {
			cursor: pointer;
		}

		&.selected {
			border-color: var(--color-primary);
		}
	}

	h2 {
		font-size: 1.2rem;
		font-weight: var(--weight-bold);
		margin: 0 0 1rem;
		text-align: left;

		&:empty::before {
			content: "???";
			color: var(--color-gray-500);
		}
	}

	.content {
		:global(> div) {
			display: grid;
			width: 100%;
			gap: 0.5rem;
			grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));

			@include mixins.responsive("small") {
				grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
			}
		}

		:global(> div.dragging::after) {
			content: " ";
			aspect-ratio: var(--card-ratio);
		}
	}
</style>
