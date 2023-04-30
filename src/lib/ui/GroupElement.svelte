<script lang="ts">
	export let title = "";
	export let selected = false;
	export let interactable = false;
</script>

<section class:interactable class:selected on:click|stopPropagation tabindex={interactable ? 0 : false}>
	<h2>{title}</h2>
	<div class="soundgrid">
		<slot></slot>
	</div>
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
	}

	h2 {
		font-size: 1.2rem;
		font-weight: var(--weight-bold);
		margin: 0 0 1rem;
		text-align: left;
	}

	.soundgrid {
		display: grid;
		width: 100%;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-auto-rows: minmax(80px, auto);
		gap: 10px;
	}
</style>
