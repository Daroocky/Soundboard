<script lang="ts">

	import {db} from "../../db";
	import {editObject} from "../../stores";
	import ConfigButton from "../configForm/ConfigButton.svelte";
	import ConfigForm from "../configForm/ConfigForm.svelte";
	import ConfigSection from "../configForm/ConfigSection.svelte";

	export let id: number;

	async function addGroup() {
		const addedGroupId = await db.groups.add({
			title: "New Group",
			volume: 100,
		});

		editObject.set({
			type: "group",
			id: addedGroupId
		})
	}
</script>

<ConfigForm data="true">
	<ConfigSection>
		<ConfigButton icon="plus" on:click={addGroup}> Add group</ConfigButton>
	</ConfigSection>
</ConfigForm>


