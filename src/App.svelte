<script lang="ts">
	import PageHeader from "./lib/layout/PageHeader.svelte";
	import PageMain from "./lib/layout/PageMain.svelte";
	import PageSidebar from "./lib/layout/PageSidebar.svelte";
	import {editMode} from "./stores";
</script>

<div class="page" class:editMode={$editMode}>
	<PageHeader />
	<PageMain />
	<PageSidebar />
</div>

<style lang="scss">
	@use "mixins";

	.page {
		display: grid;
		overflow: hidden;
		height: 100vh;
		height: -webkit-fill-available;
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
