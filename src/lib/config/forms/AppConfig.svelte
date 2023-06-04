<script lang="ts">
	import { locales, t } from "svelte-i18n";
	import { db } from "../../../db";
	import { createConfigStore } from "../../../utils/configDataStore";
	import ConfigButton from "../inputs/ConfigButton.svelte";
	import ConfigDropdown from "../inputs/ConfigDropdown.svelte";
	import ConfigForm from "../inputs/ConfigForm.svelte";
	import ConfigSection from "../inputs/ConfigSection.svelte";
	import { createNewGroup } from "../editData";

	export let id: number;

	const { data, onDataChanged } = createConfigStore(() => {
		return db.app.toCollection().first();
	});

	onDataChanged((newData) => db.app.update(1, newData));

	async function addGroup() {
		createNewGroup();
	}
</script>

<ConfigForm data={$data}>
	<ConfigSection title={$t("config.app.groupTitleApp")}>
		<ConfigDropdown
			bind:value={$data.language}
			label={$t("config.app.language")}
			let:option
			options={$locales}
		>
			{$t("config.app.languages." + option.value)}
		</ConfigDropdown>
	</ConfigSection>
	<ConfigSection title="Groups">
		<ConfigButton icon="add" on:click={addGroup}>{$t("config.app.addGroup")}</ConfigButton>
	</ConfigSection>
</ConfigForm>
