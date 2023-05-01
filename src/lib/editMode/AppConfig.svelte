<script lang="ts">
	import {locales, t} from "svelte-i18n";
	import {db} from "../../db";
	import {editObject} from "../../stores";
	import {createConfigStore} from "../../utils/configDataStore";
	import ConfigButton from "../configForm/ConfigButton.svelte";
	import ConfigDropdown from "../configForm/ConfigDropdown.svelte";
	import ConfigForm from "../configForm/ConfigForm.svelte";
	import ConfigSection from "../configForm/ConfigSection.svelte";

	export let id: number;

	const {data, onDataChanged} = createConfigStore(() => {
		return db.app.toCollection().first();
	});

	onDataChanged(newData => db.app.update(1, newData));

	async function addGroup() {
		const addedGroupId = await db.groups.add({
			title: "",
			volume: 100,
		});

		editObject.set({
			type: "group",
			id: addedGroupId
		})
	}
</script>

<ConfigForm data={$data}>
	<ConfigSection title={$t("config.app.groupTitleApp")}>
		<ConfigDropdown bind:value={$data.language} let:option options={$locales}>
			{$t("config.app.languages." + option.value)}
		</ConfigDropdown>
	</ConfigSection>
	<ConfigSection>
		<ConfigButton icon="add" on:click={addGroup}>{$t("config.app.addGroup")}</ConfigButton>
	</ConfigSection>
</ConfigForm>


