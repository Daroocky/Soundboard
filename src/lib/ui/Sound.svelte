<script lang="ts">
	import {getContext} from "svelte";
	import {shortcutTrigger} from "../../stores";
	import {createSoundPlayer} from "../../utils/soundPlayer";
	import SoundButton from "./SoundButton.svelte";

	export let id;
	export let waveform;
	export let shortcut = "";
	export let title = "";
	export let color = "";
	export let blob: string;
	export let loop = false;
	export let solo = false;
	export let pausable = false;
	export let volume = {sound: 100, group: 100};

	const {currentlyPlaying} = getContext("group");

	const {isLoading, isFading, isPlaying, progress, sound} = createSoundPlayer({
		src: [blob],
		loop
	});

	$: setVolume(volume);

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

	function setVolume(vol) {
		const newVolume = (vol.sound / 100) * (vol.group / 100);
		sound.volume(newVolume);
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
 {id}
 isFading={$isFading}
 isLoading={$isLoading}
 isPlaying={$isPlaying}
 {loop}
 on:click={onClick}
 {pausable}
 progress={$progress}
 {shortcut}
 {solo}
 {waveform}
>{title}</SoundButton>
