<script lang="ts">
	import {debounce} from "radash";
	import {db} from "../../db";
	import {editObject} from "../../stores";
	import ConfigButton from "../configForm/ConfigButton.svelte";
	import ConfigForm from "../configForm/ConfigForm.svelte";
	import ConfigInput from "../configForm/ConfigInput.svelte";
	import ConfigSection from "../configForm/ConfigSection.svelte";

	export let id: number;
	let data = null;
	$: loadData(id);

	async function loadData(groupId) {
		data = null;
		data = await db.groups.where("id").equals(groupId).first();
	}

	$: {
		data = data;
		updateData();
	}

	const updateData = debounce({delay: 500}, () => {
		console.log("Update DB")
		db.groups.update(id, data);
	});

	async function removeGroup() {
		db.groups.delete(id);

		//todo: delete all sounds

		editObject.set({
			type: "app",
			id: 0
		});
	}

	async function addSound() {
		const addedSoundId = await db.sounds.add({
			title: "",
			color: "",
			group: id,
			file: {blob: "", filename: ""},
			loop: false,
			pausable: false,
			shortcut: "",
			solo: false,
			volume: 100
		});

		editObject.set({
			type: "audio",
			id: addedSoundId
		})
	}

	async function updateTitle(e) {
		console.log(data.title, e.detail)
		const title = e.detail
		if (data.title === title) {
			return
		}

		db.groups.update(id, {title});
	}
</script>

<ConfigForm {data}>
	<ConfigSection>
		<ConfigInput bind:value={data.title} label="Titel" />
	</ConfigSection>
	<ConfigSection>
		<ConfigButton icon="add" on:click={addSound}>Add new sound</ConfigButton>
	</ConfigSection>
	<ConfigSection title="Danger Zone">
		<ConfigButton icon="trash" on:click={removeGroup}>Delete this group</ConfigButton>
	</ConfigSection>
</ConfigForm>




