<script lang="ts">
	import {shortcutTrigger} from "../../../stores";
	import {validShortcutKey} from "../../../utils/helper";
	import Group from "../../ui/Group.svelte";
	import Sound from "../../ui/Sound.svelte";

	export let groups;


	function handleShortcuts({key, altKey, ctrlKey, shiftKey, metaKey}: KeyboardEvent) {
		if (altKey || ctrlKey || shiftKey || metaKey) {
			return
		}

		if (validShortcutKey(key)) {
			shortcutTrigger.set(key.toUpperCase());
		}
	}
</script>

<svelte:body on:keydown={handleShortcuts} />

<div>
	{#each groups as group(group.id)}
		<Group title={group.title}>

			{#each group.sounds as sound(sound.id)}
				<Sound
				 waveform={sound.file.waveform}
				 color={sound.color}
				 id={sound.id}
				 loop={sound.loop}
				 title={sound.title}
				 blob={sound.file.blob}
				 solo={sound.solo}
				 pausable={sound.pausable}
				 shortcut={sound.shortcut}
				/>

			{/each}
		</Group>
	{/each}
</div>


<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
