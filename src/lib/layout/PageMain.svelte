<script lang="ts">
	import {editMode, editObject, state} from "../../stores.ts";
	import ContentEdit from "./content/ContentEdit.svelte";
	import ContentLive from "./content/ContentLive.svelte";

	function edit() {
		editObject.set({type: "app", id: 0});
	}
</script>

<main on:click={edit}>
	{#if $state}
		<svelte:component this={$editMode ? ContentEdit : ContentLive} groups={$state.groups} />
	{/if}
</main>


<style lang="scss">
	@use "src/mixins";

	main {
		overflow-y: auto;
		padding: 0.5rem;

		@include mixins.responsive("small") {
			display: grid;
			justify-content: center;
			padding: 1rem;
		}
	}
</style>
