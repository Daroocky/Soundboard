<script lang="ts">
	import {editObject} from "../../../stores.ts";
	import AppConfig from "../../editMode/AppConfig.svelte";
	import AudioConfig from "../../editMode/AudioConfig.svelte";
	import GroupConfig from "../../editMode/GroupConfig.svelte";

	const editConfigs = {
		audio: AudioConfig,
		group: GroupConfig,
		app: AppConfig,
	}

</script>

<aside>
	<svelte:component id="{$editObject.id}" this={editConfigs[$editObject?.type]} />
</aside>


<style lang="scss">
	aside {
		overflow-y: auto;
		min-width: 22rem;
		max-width: 22rem;
		border-left: 1px solid var(--color-gray-500);
	}
</style>
