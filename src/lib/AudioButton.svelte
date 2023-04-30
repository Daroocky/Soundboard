<script lang="ts">
	import {getContext} from "svelte";
	import {editMode, editObject} from "../stores";
	import HowlSound from "./HowlSound.svelte";

	export let id = -1;
	export let name: string;
	export let src: string;
	export let loop: boolean;


	const {currentlyPlaying, single} = getContext("group");

	let sound;
	const howlConfig = {
		src: [src],
		loop
	}

	const playing = () => {
		currentlyPlaying.set(name);
	}

	$: {
		if (sound && single) {
			if (sound.playing() && $currentlyPlaying != name) {
				sound.fadeOut();
			}
		}
	}


	const play = () => {
		if ($editMode) {
			editObject.set({
				type: "audio",
				id
			});

			return;
		}

		if (single) {
			if (sound.playing()) {
				sound.fadeOut();
			} else {
				sound.fadeIn();
			}
		} else {
			sound.stop();
			sound.play()
		}
	}
</script>

<HowlSound bind:sound={sound} config={howlConfig} on:click={play} on:play={playing}>
	<i class="icon fa-solid fa-music"></i>
	<span>{name}</span>
</HowlSound>

<style>
  .icon {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  span {
    font-size: 20px;
  }
</style>
