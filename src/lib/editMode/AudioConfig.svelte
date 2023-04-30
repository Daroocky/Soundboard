<script lang="ts">
	import {db} from "../../db";
	import {editObject} from "../../stores";
	import ConfigButton from "../configForm/ConfigButton.svelte";
	import ConfigCheckbox from "../configForm/ConfigCheckbox.svelte";
	import ConfigDropdown from "../configForm/ConfigDropdown.svelte";
	import ConfigForm from "../configForm/ConfigForm.svelte";
	import ConfigInput from "../configForm/ConfigInput.svelte";
	import ConfigSection from "../configForm/ConfigSection.svelte";
	import ConfigUpload from "../configForm/ConfigUpload.svelte";

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

	const colors = [
		{
			value: "red",
			label: "Red",
			color: "var(--color-red)"
		},
		{
			value: "green",
			label: "Green",
			color: "var(--color-green)"
		},
		{
			value: "blue",
			label: "Blue",
			color: "var(--color-blue)"
		}
	];

	const shortcuts = [
		{value: "Q"},
		{value: "W"},
		{value: "E"},
		{value: "R"},
		{value: "T"},
		{value: "Y"},
	]

	function newFileAdded(event) {
		console.log(event.detail)
	}
</script>

<ConfigForm {data}>
	<ConfigSection>
		<ConfigInput label="Title" on:input={updateTitle} value={data.name} />
		<ConfigDropdown label="Color" let:option options={colors}>
			<span class="colorOption">
				<span class="colorPreview" style:--color={option.color}></span>
				<span>{option.label}</span>
			</span>
		</ConfigDropdown>
		<ConfigDropdown label="Shortcut" options={shortcuts} />
	</ConfigSection>
	<ConfigSection title="Playback">
		<ConfigCheckbox label="Loop" value={data.loop} />
		<ConfigCheckbox label="Solo" value={data.loop} />
		<ConfigCheckbox label="Pausable" value={data.loop} />
	</ConfigSection>
	<ConfigSection title="File">
		<ConfigUpload on:upload={newFileAdded} />
	</ConfigSection>
	<ConfigSection title="Danger Zone">
		<ConfigButton icon="trash" on:click={removeAudio}>Delete this Sound</ConfigButton>
	</ConfigSection>
</ConfigForm>

<style>
  .colorOption {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .colorPreview {
    display: block;
    height: 1rem;
    border-radius: var(--radius-small);
    background-color: var(--color, white);
    aspect-ratio: 1/1;
  }
</style>
