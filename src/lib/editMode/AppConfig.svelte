<script lang="ts">

	import {db} from "../../db";
	import {editObject} from "../../stores";
	import ConfigButton from "../configForm/ConfigButton.svelte";
	import ConfigDropdown from "../configForm/ConfigDropdown.svelte";
	import ConfigForm from "../configForm/ConfigForm.svelte";
	import ConfigInput from "../configForm/ConfigInput.svelte";
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

	function focusLost(e) {
		console.log("Focus", e)
	}
</script>

<ConfigForm data="true">
	<ConfigSection title={id}>
		<ConfigInput bind:value={id} label="Titel" on:input={focusLost} />

		<ConfigDropdown label="Color" on:input={focusLost} options={[ { value:"red"}, {value: "green"}, { value: "blue"} ]}>

		</ConfigDropdown>
		<ConfigDropdown label="Color 2" let:option options={[ { value:"red"}, {value: "green"}, { value: "blue"} ]}>
			<span>🎲</span>
			<span>{option?.value}</span>
		</ConfigDropdown>
	</ConfigSection>
	<ConfigSection>
		<ConfigButton icon="plus" on:click={addCategory}> Add Category</ConfigButton>
	</ConfigSection>
</ConfigForm>


