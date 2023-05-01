<script lang="ts">
	import {debounce, title} from "radash";
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

	$: {
		data = data;
		updateData();
	}

	const updateData = debounce({delay: 250}, () => {
		console.log("Update DB")
		db.sounds.update(id, data);
	});

	async function loadData(audioId) {
		data = null;
		data = await db.sounds.where("id").equals(audioId).first();
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


	async function removeAudio() {
		db.sounds.delete(id);

		editObject.set({
			type: "app",
			id: 0
		});
	}

	function newFileAdded(event) {
		if (data.title === "") {
			const {filename} = event.detail;
			const newTitle = filename.slice(0, filename.lastIndexOf("."));
			data.title = title(newTitle);
		}

		data.file = event.detail;
	}
</script>

<ConfigForm {data}>
	<ConfigSection>
		<ConfigInput bind:value={data.title} label="Title" />
		<ConfigDropdown bind:value={data.color} label="Color" let:option options={colors}>
			<span class="colorOption">
				<span class="colorPreview" style:--color={option.color}></span>
				<span>{option.label}</span>
			</span>
		</ConfigDropdown>
		<ConfigDropdown bind:value={data.shortcut} label="Shortcut" options={shortcuts} />
	</ConfigSection>
	<ConfigSection title="Playback">
		<ConfigCheckbox bind:value={data.loop} label="Loop" />
		<ConfigCheckbox bind:value={data.solo} label="Solo" />
		<ConfigCheckbox bind:value={data.pausable} label="Pausable" />
	</ConfigSection>
	<ConfigSection title="File">
		<ConfigUpload on:upload={newFileAdded} value={data.file.filename} />
	</ConfigSection>
	<ConfigSection title="Danger Zone">
		<ConfigButton icon="delete" on:click={removeAudio}>Delete this Sound</ConfigButton>
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
