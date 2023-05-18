<script lang="ts">
	import {db} from "../../../db";
	import {editObject} from "../../../stores";
	import DndZone from "../../dndZone/DndZone.svelte";
	import GroupElement from "../../ui/GroupElement.svelte";
	import SoundButton from "../../ui/SoundButton.svelte";

	export let groups;

	function updateGroupOrder({detail}) {
		const dbUpdate = detail.map((entry, i) => ({
			key: entry.id,
			changes: {
				position: i
			}
		}))

		db.groups.bulkUpdate(dbUpdate);
	}

	function updateSoundOrder({detail}) {
		const dbUpdate = detail.map((entry, i) => ({
			key: entry.id,
			changes: {
				position: i,
			}
		}))

		db.sounds.bulkUpdate(dbUpdate);
	}

	function changeGroupOfSound(detail, groupId) {
		const dbUpdate = detail.map((entry, i) => ({
			key: entry.id,
			changes: {
				position: i,
				group: groupId
			}
		}))

		db.sounds.bulkUpdate(dbUpdate);
	}

	function editGroup(id) {
		editObject.set({type: "group", id});
	}

	function editSound(id) {
		editObject.set({type: "audio", id});
	}
</script>

<div>
	<DndZone items={groups} let:item={group} on:update={updateGroupOrder}>
		<GroupElement
		 interactable={true}
		 on:click={() => editGroup(group.id)}
		 selected={$editObject && $editObject.type === "group" && $editObject.id === group.id}
		 title={group.title}>

			<DndZone
			 group="sounds"
			 items={group.sounds}
			 let:item={sound}
			 on:add={({detail}) =>changeGroupOfSound(detail, group.id)}
			 on:update={updateSoundOrder}>
				<SoundButton
				 color={sound.color}
				 id={sound.id}
				 isLoading={false}
				 isPlaying={$editObject && $editObject.type === "audio" && $editObject.id === sound.id}
				 loop={sound.loop}
				 on:click={() => editSound(sound.id)}
				 pausable={sound.pausable}
				 shortcut={sound.shortcut}
				 solo={sound.solo}
				 waveform={sound.file.waveform}
				>{sound.title}</SoundButton>
			</DndZone>

		</GroupElement>
	</DndZone>
</div>


<style lang="scss">
	div {
		:global(> div) {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}
	}
</style>
