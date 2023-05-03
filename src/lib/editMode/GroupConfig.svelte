<script lang="ts">
	import {t} from "svelte-i18n";
	import {db} from "../../db";
	import {editObject} from "../../stores";
	import {createConfigStore} from "../../utils/configDataStore";
	import ConfigButton from "../configForm/ConfigButton.svelte";
	import ConfigDelete from "../configForm/ConfigDelete.svelte";
	import ConfigForm from "../configForm/ConfigForm.svelte";
	import ConfigInput from "../configForm/ConfigInput.svelte";
	import ConfigSection from "../configForm/ConfigSection.svelte";

	export let id: number;

	const {data, reloadData, onDataChanged} = createConfigStore(() => {
		return db.groups.where("id").equals(id).first();
	});

	$: reloadData(id)

	onDataChanged(newData => db.groups.update(id, newData));

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
			position: Date.now(),
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

<ConfigForm data={$data}>
	<ConfigSection>
		<ConfigInput bind:value={$data.title} label={$t("config.group.title")} />
	</ConfigSection>
	<ConfigSection>
		<ConfigButton icon="add" on:click={addSound}>{$t("config.group.addSound")}</ConfigButton>
	</ConfigSection>
	<ConfigSection title={$t("config.group.groupTitleDanger")}>
		<ConfigDelete on:delete={removeGroup}>{$t("config.group.deleteGroup")}</ConfigDelete>
	</ConfigSection>
</ConfigForm>




