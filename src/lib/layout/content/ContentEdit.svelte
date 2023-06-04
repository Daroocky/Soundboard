<script lang="ts">
	import { t } from "svelte-i18n";
	import { db } from "../../../db";
	import { editObject } from "../../../stores";
	import { createNewGroup, createNewSound } from "../../config/editData";
	import DndZone from "../../dndZone/DndZone.svelte";
	import Group from "../../ui/Group.svelte";
	import GroupElement from "../../ui/GroupElement.svelte";
	import Icon from "../../ui/Icon.svelte";
	import SoundButton from "../../ui/SoundButton.svelte";

	export let groups: Group[];

	function updateGroupOrder({ detail }) {
		const dbUpdate = detail.map((entry, i) => ({
			key: entry.id,
			changes: {
				position: i,
			},
		}));

		db.groups.bulkUpdate(dbUpdate);
	}

	function updateSoundOrder({ detail }) {
		const dbUpdate = detail.map((entry, i) => ({
			key: entry.id,
			changes: {
				position: i,
			},
		}));

		db.sounds.bulkUpdate(dbUpdate);
	}

	function changeGroupOfSound(detail, groupId) {
		const dbUpdate = detail.map((entry, i) => ({
			key: entry.id,
			changes: {
				position: i,
				group: groupId,
			},
		}));

		db.sounds.bulkUpdate(dbUpdate);
	}

	function editGroup(id) {
		editObject.set({ type: "group", id });
	}

	function editSound(id) {
		editObject.set({ type: "audio", id });
	}
</script>

<div class="group-grid">
	<DndZone items={groups} let:item={group} on:update={updateGroupOrder}>
		<GroupElement
			interactable={true}
			on:click={() => editGroup(group.id)}
			selected={$editObject && $editObject.type === "group" && $editObject.id === group.id}
			title={group.title}
		>
			<DndZone
				group="sounds"
				items={group.sounds}
				let:item={sound}
				on:add={({ detail }) => changeGroupOfSound(detail, group.id)}
				on:update={updateSoundOrder}
			>
				<SoundButton
					color={sound.color}
					id={sound.id}
					isLoading={false}
					isPlaying={$editObject && $editObject.type === "audio" && $editObject.id === sound.id}
					loop={sound.loop}
					on:click={() => editSound(sound.id)}
					pauseable={sound.pauseable}
					shortcut={sound.shortcut}
					solo={sound.solo}
					waveform={sound.file.waveform}>{sound.title}</SoundButton
				>

				<button
					class="add-sound"
					slot="additional"
					on:click|stopPropagation={() => createNewSound(group.id)}
				>
					<Icon name="add" />
					{$t("config.group.addSound")}
				</button>
			</DndZone>
		</GroupElement>

		<button class="add-group" slot="additional" on:click|stopPropagation={() => createNewGroup()}>
			<Icon name="add" />
			{$t("config.app.addGroup")}
		</button>
	</DndZone>
</div>

<style lang="scss">
	.add-group,
	.add-sound {
		border: 2px dashed var(--color-gray-500);
		border-radius: var(--radius-normal);
		background-color: transparent;
		padding: 1rem;
		width: 100%;
		color: var(--color-gray-100);
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
	}

	.add-sound {
		aspect-ratio: var(--card-ratio);
	}

	.group-grid {
		:global(> .drag-zone) {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}
	}
</style>
