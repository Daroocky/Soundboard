<script lang="ts">
	import {createEventDispatcher} from "svelte";

	const dispatch = createEventDispatcher();
	export let label = "Drag your files here or click in this area.";
	export let value = "";

	function fileSelected(e) {
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


		value = file.name;

		const reader = new FileReader();
		reader.addEventListener("load", data => {
			dispatch("upload", {
				filename: file.name,
				blob: reader.result
			});
		});
		reader.addEventListener("progress", data => {
			console.log(data);
		});

		reader.readAsDataURL(file);
	}
</script>

<label class="dropzone">
	<span class="label">
		{value ? value : label}
	</span>
	<input accept="audio/*" on:change={fileSelected} type="file">
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
	}

	.label {
		font-size: 0.9rem;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 0;
		color: var(--color-gray-400);
		inset: 0;
	}

	input {
		position: absolute;
		cursor: pointer;
		opacity: 0;
		inset: 0;
	}
</style>
