<script>
	import Icon from "../Icon.svelte";

	export let icon;
	export let title;
</script>

<div class="card">
	<Icon name={icon} />
	<span>{title}</span>
</div>

<style lang="scss">
	@use "src/mixins";

	.card {
		width: 100%;
		height: 100%;
		aspect-ratio: 1/ 1;

		font-size: 2rem;
		display: flex;
		align-items: center;

		flex-direction: column;
		justify-content: center;
		background-color: var(--color-gray-900);
		color: var(--color-gray-100);
		text-decoration: none;
		border-radius: var(--radius-normal);

		gap: 0.5rem;

		span {
			font-size: 1rem;
		}

		@include mixins.responsive("small") {
			font-size: 3rem;

			span {
				font-size: 2rem;
			}
		}
	}
</style>
