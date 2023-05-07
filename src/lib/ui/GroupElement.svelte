<script lang="ts">

	export let title = "";
	export let selected = false;
	export let interactable = false;
</script>

<section class:interactable class:selected on:click|stopPropagation tabindex={interactable ? 0 : false}>
	<h2>{title}</h2>
	<slot></slot>
</section>

<style lang="scss">
	@use "src/mixins";

	section {
		position: relative;
		padding: 0.5rem;
		border: 2px solid transparent;
		border-radius: var(--radius-normal);
		background-color: var(--color-gray-700);

		container-type: inline-size;

		@include mixins.responsive("small") {
			width: calc(100vw - 24rem);
			padding: 1rem;
		}

		&.interactable {
			cursor: pointer;
		}

		&.selected {
			border-color: var(--color-primary);
		}

		:global(> div) {
			display: grid;
			width: 100%;
			gap: 10px;
			grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));

			@include mixins.responsive("small") {
				grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
			}
		}
	}

	h2 {
		font-size: 1.2rem;
		font-weight: var(--weight-bold);
		margin: 0 0 1rem;
		text-align: left;
	}
</style>
