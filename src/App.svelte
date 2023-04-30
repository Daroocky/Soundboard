<script lang="ts">
	import AudioButton from "./lib/AudioButton.svelte";
	import Category from "./lib/Category.svelte";
	import AppConfig from "./lib/editMode/AppConfig.svelte";
	import AudioConfig from "./lib/editMode/AudioConfig.svelte";
	import CategoryConfig from "./lib/editMode/CategoryConfig.svelte";
	import {editMode, editObject, state} from "./stores";

	const editConfigs = {
		audio: AudioConfig,
		category: CategoryConfig,
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
			{#each $state as category (category.id)}
				<Category
				 id={category.id}
				 title={category.title}
				 single={category.single}
				>
					{#each category.sounds as sound (sound.id)}
						<AudioButton
						 id={sound.id}
						 name={sound.name}
						 src={sound.src}
						 loop={sound.loop}
						/>
					{/each}
				</Category>
			{/each}
		{/if}


		<!--
		<Category title="Ambiente" single={true}>
			<AudioButton name="Regen" loop={true}  src="src/assets/sounds/ambient/rain.mp3" />
			<AudioButton name="Regen & Gewitter" loop={true}  src="src/assets/sounds/ambient/rain-thunder.mp3" />
			<AudioButton name="Wald" loop={true}  src="src/assets/sounds/ambient/forest.mp3" />
		</Category>


		<Category title="Soundeffects" single={false}>
			<AudioButton name="Wolf" src="src/assets/sounds/sounds/wolf.mp3" />
			<AudioButton name="Mann Schrei" src="src/assets/sounds/sounds/man-scream-121085.mp3" />
			<AudioButton name="Frau Schrei" src="src/assets/sounds/sounds/girl_scream-6465.mp3" />
		</Category>
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
    min-width: 350px;
    max-width: 350px;
    border-left: 1px solid hsl(0deg 0% 100% / 10%);
  }

  aside.open {
    display: block;
  }
</style>
