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
	section {
		position: relative;
		padding: 1rem;
		border: 2px solid transparent;
		border-radius: var(--radius-normal);
		background-color: var(--color-gray-700);

		&.interactable {
			cursor: pointer;
		}

		&.selected {
			border-color: var(--color-primary);
		}

		:global(> div) {
			display: grid;
			width: 100%;
			grid-template-columns: repeat(6, 1fr);
			gap: 10px;
		}
	}

	h2 {
		font-size: 1.2rem;
		font-weight: var(--weight-bold);
		margin: 0 0 1rem;
		text-align: left;
	}
</style>
