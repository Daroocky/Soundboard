<script lang="ts">
	import AudioButton from "./lib/AudioButton.svelte";
	import AppConfig from "./lib/editMode/AppConfig.svelte";
	import AudioConfig from "./lib/editMode/AudioConfig.svelte";
	import GroupConfig from "./lib/editMode/GroupConfig.svelte";
	import Group from "./lib/Group.svelte";
	import {editMode, editObject, state} from "./stores";

	const editConfigs = {
		audio: AudioConfig,
		group: GroupConfig,
		app: AppConfig,
	}

	function toggleEdit() {
		editMode.set(!$editMode)
	}

	function edit() {
		if ($editMode) {
			editObject.set({
				type: "app",
				id: 0
			});

			return;
		}
	}
</script>

<div class="wrapper">
	<main on:click={edit}>


		<button on:click={toggleEdit}>{$editMode ? "Edit Mode" : "Live Mode"}</button>

		{#if $state}
			{#each $state as group (group.id)}
				<Group
				 id={group.id}
				 title={group.title}
				 single={group.single}
				>
					{#each group.sounds as sound (sound.id)}
						<AudioButton
						 id={sound.id}
						 name={sound.title}
						 src={sound.file.blob}
						 loop={sound.loop}
						/>
					{/each}
				</Group>
			{/each}
		{/if}


		<!--
		<Group title="Ambiente" single={true}>
			<AudioButton name="Regen" loop={true}  src="src/assets/sounds/ambient/rain.mp3" />
			<AudioButton name="Regen & Gewitter" loop={true}  src="src/assets/sounds/ambient/rain-thunder.mp3" />
			<AudioButton name="Wald" loop={true}  src="src/assets/sounds/ambient/forest.mp3" />
		</Group>


		<Group title="Soundeffects" single={false}>
			<AudioButton name="Wolf" src="src/assets/sounds/sounds/wolf.mp3" />
			<AudioButton name="Mann Schrei" src="src/assets/sounds/sounds/man-scream-121085.mp3" />
			<AudioButton name="Frau Schrei" src="src/assets/sounds/sounds/girl_scream-6465.mp3" />
		</Group>
		 -->
	</main>

	<aside class:open={$editMode}>
		<svelte:component id="{$editObject.id}" this={editConfigs[$editObject?.type]} />
	</aside>
</div>

<style>
  .wrapper {
    display: flex;
    min-height: 100vh;
  }

  main {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
  }

  aside {
    display: none;
    min-width: 22rem;
    max-width: 22rem;
    border-left: 1px solid var(--color-gray-500);
  }

  aside.open {
    display: block;
  }
</style>
