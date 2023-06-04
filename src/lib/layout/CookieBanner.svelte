<script lang="ts">
	import { t } from "svelte-i18n";
	import { acceptsCookies } from "../../stores";
</script>

{#if $acceptsCookies == null}
	<div class="cookie">
		<p>{$t("cookie-banner.summary")}</p>
		<div class="options">
			<button class="accept" on:click={() => acceptsCookies.set(true)}>
				{$t("cookie-banner.accept")}
			</button>
			<button class="denie" on:click={() => acceptsCookies.set(false)}>
				{$t("cookie-banner.denie")}
			</button>
		</div>
	</div>
{/if}

<style lang="scss">
	@use "src/mixins";

	.cookie {
		background-color: var(--color-primary);
		color: var(--color-gray-900);
		font-weight: var(--weight-bold);
		padding: 0.5rem 1rem;

		display: flex;
		flex-direction: column;
		gap: 1rem;
		justify-content: space-between;

		@include mixins.responsive("small") {
			flex-direction: row;
			align-items: center;
		}

		p {
			padding: 0;
			margin: 0;
		}

		.options {
			display: flex;
			gap: 0.5rem;

			@include mixins.responsive("small") {
				flex-direction: row-reverse;
			}
		}

		button {
			padding: 0.3rem 1rem;
			cursor: pointer;
			color: var(--color-gray-100);
			border: 2px solid var(--color-accent-primary);
			border-radius: var(--radius-normal);
			background: var(--color-accent-primary);

			&.denie {
				background: var(--color-primary);
				border-color: var(--color-primary);
				color: var(--color-accent-primary);
			}
		}
	}
</style>
