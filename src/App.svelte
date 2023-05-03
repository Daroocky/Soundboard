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
	.page {
		display: grid;
		overflow-x: hidden;
		height: 100vh;
		transition: all 250ms ease-in-out;
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
</style>
