<script lang="ts">
	import PageHeader from "./lib/layout/PageHeader.svelte";
	import PageMain from "./lib/layout/PageMain.svelte";
	import PageSidebar from "./lib/layout/PageSidebar.svelte";
	import {editMode} from "./stores";
</script>

<!--<div class="aura"></div>-->

<div class="page" class:editMode={$editMode}>
	<PageHeader />
	<PageMain />
	<PageSidebar />
</div>

<style lang="scss">
	@use "mixins";

	@keyframes aura {
		from {
			rotate: 0deg;
		}

		50% {
			scale: 1.4;
		}

		to {
			rotate: 360deg;
		}
	}

	.aura {
		position: absolute;
		z-index: 0;
		top: 0;
		left: 50%;
		width: max(75vw, 75vh);
		animation: aura 120s linear infinite;
		opacity: 0.2;
		border-radius: 50%;
		background-image: linear-gradient(140deg, var(--color-turquoise), var(--color-purple));
		//background-image: linear-gradient(140deg, var(--color-red), var(--color-green));
		aspect-ratio: 3 / 2;

		translate: -50% 0;
	}

	.page {
		position: relative;
		z-index: 1;
		display: grid;
		overflow: hidden;
		height: 100dvh;
		transition: all 250ms ease-in-out;
		//background-color: hsl(0, 0%, 14%, 0.7);
		-webkit-backdrop-filter: blur(50px);
		backdrop-filter: blur(50px);
		grid-template-columns: 1fr;

		grid-template-rows: auto 1fr;

		&.editMode {
			:global(aside) {
				translate: 0 0;
			}
		}

		:global(header) {
			grid-area: 1 / 1 / 2 / 2;
		}

		:global(main) {
			grid-area: 2 / 1 / 3 / 1;
		}

		:global(aside) {
			transition: translate 250ms ease-in-out;
			translate: 100% 0;
			grid-area: 2 / 1 / 3 / 1;
		}

		@include mixins.responsive("small") {
			grid-template-columns: 1fr 0;
			grid-template-rows: auto 1fr;

			&.editMode {
				grid-template-columns: 1fr 22rem;
			}

			:global(header) {
				grid-area: 1 / 1 / 2 / 3;
			}

			:global(main) {
				grid-area: 2 / 1 / 3 / 2;
			}

			:global(aside) {
				grid-area: 2 / 2 / 3 / 3;
			}
		}
	}
</style>
