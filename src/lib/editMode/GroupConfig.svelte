<script lang="ts">
	import {debounce} from "radash";
	import {t} from "svelte-i18n";
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
</script>

<ConfigForm {data}>
	<ConfigSection>
		<ConfigInput bind:value={data.title} label={$t("config.group.title")} />
	</ConfigSection>
	<ConfigSection>
		<ConfigButton icon="add" on:click={addSound}>{$t("config.group.addSound")}</ConfigButton>
	</ConfigSection>
	<ConfigSection title={$t("config.group.groupTitleDanger")}>
		<ConfigButton icon="delete" on:click={removeGroup}>{$t("config.group.deleteGroup")}</ConfigButton>
	</ConfigSection>
</ConfigForm>




