<script lang="ts">
	import {title} from "radash";
	import {t} from "svelte-i18n";
	import {db} from "../../../db";
	import {editObject} from "../../../stores";
	import {mapColor} from "../../../utils/colorMapper.js";
	import {createConfigStore} from "../../../utils/configDataStore";
	import ConfigCheckbox from "../inputs/ConfigCheckbox.svelte";
	import ConfigDelete from "../inputs/ConfigDelete.svelte";
	import ConfigDropdown from "../inputs/ConfigDropdown.svelte";
	import ConfigForm from "../inputs/ConfigForm.svelte";
	import ConfigInput from "../inputs/ConfigInput.svelte";
	import ConfigSection from "../inputs/ConfigSection.svelte";
	import ConfigUpload from "../inputs/ConfigUpload.svelte";

	export let id: number;

	const {data, reloadData, onDataChanged} = createConfigStore(() => {
		return db.sounds.where("id").equals(id).first();
	});

	$: reloadData(id)

	onDataChanged(newData => db.sounds.update(id, newData));


	const colors = ["red", "orange", "yellow", "green", "turquoise", "blue", "purple", "pink"];

	const shortcuts = ["", "Q", "W", "E", "R", "T", "Y"]


	async function removeAudio() {
		db.sounds.delete(id);

		editObject.set({
			type: "app",
			id: 0
		});
	}

	function newFileAdded(event) {
		if ($data.title === "") {
			const {filename} = event.detail;
			const newTitle = filename.slice(0, filename.lastIndexOf("."));
			$data.title = title(newTitle);
		}
	}
</script>

<ConfigForm data={$data}>
	<ConfigSection>
		<ConfigInput bind:value={$data.title} label={$t("config.sound.title")} />
		<ConfigDropdown bind:value={$data.color} label={$t("config.sound.color")} let:option options={colors}>
			<span class="colorOption">
				<span class="colorPreview" style:--color={mapColor(option.value)}></span>
				<span>{$t("config.sound.colors." + option.value)}</span>
			</span>
		</ConfigDropdown>
		<ConfigDropdown bind:value={$data.shortcut} label={$t("config.sound.shortcut")} options={shortcuts} />
	</ConfigSection>
	<ConfigSection title={$t("config.sound.groupTitlePlayback")}>
		<ConfigCheckbox bind:value={$data.loop} label={$t("config.sound.loop")} />
		<ConfigCheckbox bind:value={$data.solo} label={$t("config.sound.solo")} />
		<ConfigCheckbox bind:value={$data.pausable} label={$t("config.sound.pausable")} />
	</ConfigSection>
	<ConfigSection title={$t("config.sound.groupTitleFile")}>
		<ConfigUpload bind:value={$data.file} on:upload={newFileAdded} />
	</ConfigSection>
	<ConfigSection title={$t("config.sound.groupTitleDanger")}>
		<ConfigDelete on:delete={removeAudio}>{$t("config.sound.deleteSound")}</ConfigDelete>
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
