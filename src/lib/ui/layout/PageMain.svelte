<script lang="ts">
	import Sortable from "sortablejs";
	import {db} from "../../../db";
	import {editMode, editObject, state} from "../../../stores.ts";
	import {moveElement} from "../../../utils/moveElement";
	import GroupEdit from "../../editMode/GroupEdit.svelte";
	import SoundEdit from "../../editMode/SoundEdit.svelte";
	import Group from "../../Group.svelte";
	import Sound from "../../Sound.svelte";

	let el;
	let sort;

	function edit() {
		if ($editMode) {
			editObject.set({
				type: "app",
				id: 0
			});

			return;
		}
	}

	function onDragEnd(event) {
		const newAr = moveElement($state.groups, event.oldIndex, event.newIndex);

		const dbUpdate = newAr.map((entry, i) => ({
			key: entry.id,
			changes: {
				position: i
			}
		}))

		db.groups.bulkUpdate(dbUpdate);
	}

	function initSort() {
		sort = new Sortable(el, {
			animation: 250,
			onEnd: onDragEnd
		});
	}

	$: {
		if (el && $editMode) {
			initSort();
		} else {
			if (sort) {
				sort.destroy();
			}
		}
	}
</script>

<main on:click={edit}>
	<div bind:this={el} class="groupList">
		{#if $state}
			{#each $state.groups as group (group.id)}
				<svelte:component this={$editMode ? GroupEdit : Group}
				 id={group.id}
				 title={group.title}
				 items={group.sounds}
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
	</div>
</main>


<style lang="scss">
	main {
		overflow-y: auto;
		padding: 1rem;

		.groupList {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}
	}
</style>
