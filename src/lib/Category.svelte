<script lang="ts">
	import {setContext} from "svelte";
	import {writable} from "svelte/store";
	import {editMode, editObject} from "../stores";

	export let id = -1;
	export let title = "";
	export let single = "";

	setContext("category", {
		currentlyPlaying: writable(""),
		single
	});

	function edit() {
		if ($editMode) {
			editObject.set({
				type: "category",
				id
			});

			return;
		}
	}

</script>

<section on:click|stopPropagation={edit}>
	<h2>{title}</h2>
	<div class="soundgrid">
		<slot></slot>
	</div>
</section>

<style>
  section {
    position: relative;
  }

  h2 {
    text-align: left;
  }

  .soundgrid {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-rows: minmax(80px, auto);
    gap: 10px;
  }
</style>
