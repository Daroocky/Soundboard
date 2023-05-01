<script lang="ts">
	import {editMode, editObject, state} from "../../../stores.ts";
	import GroupEdit from "../../editMode/GroupEdit.svelte";
	import SoundEdit from "../../editMode/SoundEdit.svelte";
	import Group from "../../Group.svelte";
	import Sound from "../../Sound.svelte";

	function edit() {
		if ($editMode) {
			editObject.set({
				type: "app",
				id: 0
			});

			return;
		}
	}
</script>

<main on:click={edit}>
	{#if $state}
		{#each $state as group (group.id)}
			<svelte:component this={$editMode ? GroupEdit : Group}
			 id={group.id}
			 title={group.title}
			>
				{#each group.sounds as sound (sound.id)}
					<svelte:component this={$editMode ? SoundEdit : Sound}
					 id={sound.id}
					 title={sound.title}
					 color={sound.color}
					 blob={sound.file.blob}
					 solo={sound.solo}
					 loop={sound.loop}
					 pausable={sound.pausable}
					/>
				{/each}
			</svelte:component>
		{/each}
	{/if}
</main>


<style lang="scss">
	main {
		display: flex;
		overflow-y: auto;
		flex-direction: column;
		padding: 1rem;
		gap: 1rem;
	}
</style>
