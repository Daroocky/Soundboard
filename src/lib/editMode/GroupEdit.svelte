<script lang="ts">

	import {editObject} from "../../stores";
	import GroupElement from "../ui/GroupElement.svelte";

	export let id = -1;
	export let title = "";


	function edit() {
		editObject.set({
			type: "group",
			id
		});

		return;
	}

</script>

<GroupElement interactable={true} on:click={edit} selected={$editObject.type === "group" && $editObject.id === id} {title}>
	<slot />
</GroupElement>


