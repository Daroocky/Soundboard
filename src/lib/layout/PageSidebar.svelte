<script lang="ts">
	import {editObject} from "../../stores.ts";
	import AppConfig from "../config/forms/AppConfig.svelte";
	import AudioConfig from "../config/forms/AudioConfig.svelte";
	import GroupConfig from "../config/forms/GroupConfig.svelte";
	import Icon from "../ui/Icon.svelte";

	const editConfigs = {
		audio: AudioConfig,
		group: GroupConfig,
		app: AppConfig,
	}

	function hideSidebar() {
		editObject.set(null);
	}

</script>

<aside class:hide={$editObject == null}>
	<div class="header">
		<button on:click={hideSidebar}>
			<Icon name="arrow_back" />
		</button>
		<h2>{$editObject ? $editObject.type : ""}</h2>
	</div>
	<div class="content">
		<svelte:component id="{$editObject?.id}" this={editConfigs[$editObject?.type]} />
	</div>
</aside>


<style lang="scss">
	@use "src/mixins";

	aside {
		z-index: 1;
		display: grid;
		overflow: hidden;
		width: 100%;
		background-color: var(--color-gray-800);
		grid-template-rows: auto 1fr;

		&.hide {
			translate: 100% 0 !important;
		}

		@include mixins.responsive("small") {
			min-width: 22rem;
			max-width: 22rem;
			border-left: 1px solid var(--color-gray-500);
		}
	}

	.header {
		display: flex;
		justify-content: start;
		padding: 0.5rem;
		border-bottom: 1px solid var(--color-gray-500);

		@include mixins.responsive("small") {
			display: none;
		}

		button {
			font-size: 1.2rem;
			line-height: 0;
			color: var(--color-gray-100);
			border: none;
			background-color: transparent;
		}

		h2 {
			font-size: 1.2rem;
			margin: 0;
			padding: 0;
		}

	}

	.content {
		overflow-y: auto;
		height: 100%;
	}
</style>
