<script lang="ts">

	import {db} from "../../db";
	import {editObject} from "../../stores";
	import ConfigButton from "../configForm/ConfigButton.svelte";
	import ConfigForm from "../configForm/ConfigForm.svelte";
	import ConfigSection from "../configForm/ConfigSection.svelte";

	export let id: number;

	async function addCategory() {
		const addedCategoryId = await db.categories.add({
			title: "Neue Kategorie",
			audios: [],
			single: false
		});

		editObject.set({
			type: "category",
			id: addedCategoryId
		})
	}
</script>

<ConfigForm data="true">
	<ConfigSection>
		<ConfigButton icon="plus" on:click={addCategory}> Add Category</ConfigButton>
	</ConfigSection>
</ConfigForm>


