<script lang="ts">
	import {db} from "../../db";
	import {editObject} from "../../stores";
	import ConfigButton from "../configForm/ConfigButton.svelte";
	import ConfigForm from "../configForm/ConfigForm.svelte";
	import ConfigInput from "../configForm/ConfigInput.svelte";
	import ConfigSection from "../configForm/ConfigSection.svelte";

	export let id: number;
	let data = null;
	$: loadData(id);

	async function loadData(categoryId) {
		data = null;
		data = await db.categories.where("id").equals(categoryId).first();
	}

	async function removeCategory() {
		db.categories.delete(id);

		//todo: delete all sounds

		editObject.set({
			type: "app",
			id: 0
		});
	}

	async function addSound() {
		const addedSoundId = await db.audios.add({
			name: "New Sound",
			src: ""
		});

		db.categories.update(id, {
			audios: [...data.audios, addedSoundId]
		})

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

		db.categories.update(id, {title});
	}
</script>

<ConfigForm {data}>
	<ConfigSection>
		<ConfigInput label="Titel" on:input={updateTitle} value={data.title} />
	</ConfigSection>
	<ConfigSection>
		<ConfigButton icon="add" on:click={addSound}>Add new sound</ConfigButton>
	</ConfigSection>
	<ConfigSection title="Danger Zone">
		<ConfigButton icon="trash" on:click={removeCategory}>Delete this group</ConfigButton>
	</ConfigSection>
</ConfigForm>




