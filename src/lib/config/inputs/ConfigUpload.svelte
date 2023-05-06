<script lang="ts">
	import {createEventDispatcher} from "svelte";
	import {t} from "svelte-i18n";
	import {lockCurrentEditSelection} from "../../../stores";
	import {blobToDataUrl, generateSoundWaveImage} from "../../../utils/soundWaveRenderer";
	import Icon from "../../ui/Icon.svelte";

	const dispatch = createEventDispatcher();
	export let label = $t("form.upload.defaultLabel");
	export let value;

	let filename = "";
	let isLoading = false;


	$: {
		filename = value?.filename || "";
	}


	async function fileSelected(e) {
		const {files} = e.target;

		if (files.length <= 0) {
			return;
		}

		const file = files[0] as File;


		if (!file.type.startsWith("audio/")) {
			console.warn("No Audio")
			e.target.value = "";
			return;
		}


		lockCurrentEditSelection.set(true);
		isLoading = true;
		filename = file.name;


		const [blob, waveform] = await Promise.all([
			blobToDataUrl(file),
			generateSoundWaveImage(file)
		]);

		isLoading = false;
		lockCurrentEditSelection.set(false);

		value = {filename, blob, waveform};
		dispatch("upload", value);
	}
</script>


<label class="dropzone">
	{#if isLoading}
		<span class="loading"><Icon name="sync" /></span>
	{/if}
	<span class="label">{filename ? filename : label}	</span>
	<input accept=".wav,.aif,.aiff,.flac,.alac,.aac,.ogg,.mp3" disabled={isLoading} on:change={fileSelected} type="file">
</label>

<style lang="scss">
	.dropzone {
		font-size: 0.9rem;
		position: relative;
		width: 100%;
		height: 8rem;
		padding: 0.5rem;
		color: var(--color-gray-100);
		border: 2px dashed var(--color-gray-500);
		border-radius: var(--radius-normal);
		background: var(--color-gray-700);

		&:focus-within {
			border-color: var(--color-primary);
		}

		&:has(input[disabled]) {
			opacity: 0.5;
		}
	}

	.label {
		font-size: 0.9rem;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 0;
		padding: 1rem;
		color: var(--color-gray-400);
		inset: 0;
	}

	@keyframes load {
		from {
			rotate: 0deg;
		}
		to {
			rotate: -360deg
		}
	}

	.loading {
		font-size: 2rem;
		line-height: 0;
		display: block;
		animation: load 1s linear infinite;
		text-align: center;
	}

	input {
		position: absolute;
		cursor: pointer;
		opacity: 0;
		inset: 0;
		appearance: none;

		&[disabled] {
			cursor: no-drop;
		}
	}
</style>
