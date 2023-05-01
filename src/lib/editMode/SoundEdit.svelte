<script lang="ts">
	import {editObject} from "../../stores.ts";
	import SoundButton from "../ui/SoundButton.svelte";

	export let id;
	export let title = "";
	export let color = "";
	export let blob: string;
	export let loop = false;
	export let solo = false;
	export let pausable = false;

	function edit() {
		editObject.set({
			type: "audio",
			id
		});
	}
</script>

<SoundButton {color} isLoading={false} isPlaying={$editObject.type === "audio" && $editObject.id === id} {loop}
 on:click={edit}>{title}</SoundButton>
