<script lang="ts">
	import {getContext} from "svelte";
	import {shortcutTrigger} from "../../stores";
	import {createSoundPlayer} from "../../utils/soundPlayer";
	import SoundButton from "./SoundButton.svelte";

	export let id;
	export let waveform;
	export let shortcut;
	export let title = "";
	export let color = "";
	export let blob: string;
	export let loop = false;
	export let solo = false;
	export let pausable = false;

	const {currentlyPlaying} = getContext("group");

	const {isLoading, isFading, isPlaying, progress, sound} = createSoundPlayer({
		src: [blob],
		loop
	});

	$: {
		if (sound) {
			if (sound.playing() && $currentlyPlaying != null && $currentlyPlaying != id) {
				sound.fadeOut(pausable);
			}
		}
	}

	$: {
		if ($shortcutTrigger === shortcut) {
			onClick();
			shortcutTrigger.set(null);
		}
	}


	function onClick() {
		if (sound.playing()) {
			pausable ? sound.pause() : sound.stop();

			if (solo && $currentlyPlaying == id) {
				currentlyPlaying.set(null);
			}

			return;
		}

		if (solo) {
			currentlyPlaying.set(id);
			sound.fadeIn();
			return;
		}

		sound.play();
	}
</script>

<SoundButton
 {color}
 isFading={$isFading}
 isLoading={$isLoading}
 isPlaying={$isPlaying}
 {loop}
 on:click={onClick}
 progress={$progress}
 {shortcut}
 {waveform}
>{title}</SoundButton>
