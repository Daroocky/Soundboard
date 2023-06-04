<script lang="ts">
	import Changelog from "./lib/layout/Changelog.svelte";
	import PageFooter from "./lib/layout/PageFooter.svelte";
	import PageHeader from "./lib/layout/PageHeader.svelte";
	import PageMain from "./lib/layout/PageMain.svelte";
	import PageSidebar from "./lib/layout/PageSidebar.svelte";
	import { editMode } from "./stores";
</script>

<Changelog />

<div class="page" class:editMode={$editMode}>
	<PageHeader />
	<PageMain />
	<PageSidebar />
</div>

<PageFooter />

<style lang="scss">
	@use "mixins";

	.page {
		position: relative;
		z-index: 1;
		display: grid;
		overflow: hidden;
		height: 100dvh;
		transition: all 250ms ease-in-out;
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
			padding-bottom: 3rem;
		}

		:global(aside) {
			transition: translate 250ms ease-in-out;
			translate: 100% 0;
			grid-area: 2 / 1 / 3 / 1;
			padding-bottom: 3rem;
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
