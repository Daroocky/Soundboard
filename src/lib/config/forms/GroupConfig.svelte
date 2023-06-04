<script lang="ts">
	import { t } from "svelte-i18n";
	import { db } from "../../../db";
	import { editObject } from "../../../stores";
	import { createConfigStore } from "../../../utils/configDataStore";
	import ConfigButton from "../inputs/ConfigButton.svelte";
	import ConfigDelete from "../inputs/ConfigDelete.svelte";
	import ConfigForm from "../inputs/ConfigForm.svelte";
	import ConfigInput from "../inputs/ConfigInput.svelte";
	import ConfigSection from "../inputs/ConfigSection.svelte";
	import ConfigVolume from "../inputs/ConfigVolume.svelte";
	import { createNewSound } from "../editData";

	export let id: number;

	const { data, reloadData, onDataChanged } = createConfigStore(() => {
		return db.groups.where("id").equals(id).first();
	});

	$: reloadData(id);

	onDataChanged((newData) => db.groups.update(id, newData));

	async function removeGroup() {
		db.groups.delete(id);

		//todo: delete all sounds

		editObject.set({
			type: "app",
			id: 0,
		});
	}

	async function addSound() {
		createNewSound(id);
	}
</script>

<ConfigForm data={$data}>
	<ConfigSection>
		<ConfigInput bind:value={$data.title} label={$t("config.group.title")} />
		<ConfigVolume bind:value={$data.volume} label={$t("config.group.volume")} />
	</ConfigSection>
	<ConfigSection>
		<ConfigButton icon="add" on:click={addSound}>{$t("config.group.addSound")}</ConfigButton>
	</ConfigSection>
	<ConfigSection title={$t("config.group.groupTitleDanger")}>
		<ConfigDelete on:delete={removeGroup}>{$t("config.group.deleteGroup")}</ConfigDelete>
	</ConfigSection>
</ConfigForm>
