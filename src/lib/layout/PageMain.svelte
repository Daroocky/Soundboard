<script lang="ts">
	import { editMode, editObject, state } from "../../stores.ts";
	import ContentEdit from "./content/ContentEdit.svelte";
	import ContentLive from "./content/ContentLive.svelte";
	import ContentWelcome from "./content/ContentWelcome.svelte";

	function edit() {
		editObject.set({ type: "app", id: 0 });
	}

	function selectView() {
		if ($editMode) {
			return ContentEdit;
		}

		if ($state.groups.length > 0) {
			return ContentLive;
		}

		return ContentWelcome;
	}
</script>

<main on:click={edit}>
	<div class="content">
		{#if $state}
			<svelte:component this={selectView()} groups={$state.groups} />
		{/if}
	</div>
</main>

<style lang="scss">
	@use "src/mixins";

	main {
		overflow-y: auto;
		padding: 0.5rem;

		@include mixins.responsive("small") {
			padding: 1rem;
			display: grid;
			align-items: start;
			justify-content: center;
		}

		.content {
			width: 100%;

			@include mixins.responsive("small") {
				width: calc(100vw - 24rem);
			}
		}
	}
</style>
