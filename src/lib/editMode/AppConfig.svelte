<script lang="ts">
	import {locale, locales, t} from "svelte-i18n";
	import {db} from "../../db";
	import {editObject} from "../../stores";
	import ConfigButton from "../configForm/ConfigButton.svelte";
	import ConfigDropdown from "../configForm/ConfigDropdown.svelte";
	import ConfigForm from "../configForm/ConfigForm.svelte";
	import ConfigSection from "../configForm/ConfigSection.svelte";

	export let id: number;

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

<ConfigForm data="true">
	<ConfigSection title={$t("config.app.groupTitleApp")}>
		<ConfigDropdown bind:value={$locale} let:option options={$locales}>
			{$t("config.app.languages." + option.value)}
		</ConfigDropdown>
	</ConfigSection>
	<ConfigSection>
		<ConfigButton icon="add" on:click={addGroup}>{$t("config.app.addGroup")}</ConfigButton>
	</ConfigSection>
</ConfigForm>


