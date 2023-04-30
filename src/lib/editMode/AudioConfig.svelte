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

	async function loadData(audioId) {
		data = null;
		data = await db.audios.where("id").equals(audioId).first();
	}

	async function updateTitle(e) {
		const name = e.detail
		if (data.name === name) {
			return
		}

		db.audios.update(id, {name});
	}

	async function removeAudio() {
		db.audios.delete(id);

		editObject.set({
			type: "app",
			id: 0
		});
	}
</script>

<ConfigForm {data}>
	<ConfigSection>
		<ConfigInput label="Title" on:input={updateTitle} value={data.name} />
	</ConfigSection>
	<ConfigSection title="Danger Zone">
		<ConfigButton icon="trash" on:click={removeAudio}>Delete this Sound</ConfigButton>
	</ConfigSection>
</ConfigForm>

