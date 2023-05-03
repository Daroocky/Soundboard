<script lang="ts">
	import {setContext} from "svelte";
	import {writable} from "svelte/store";
	import GroupElement from "./ui/GroupElement.svelte";

	export let id = -1;
	export let title = "";

	setContext("group", {
		currentlyPlaying: writable(""),
	});
</script>

<GroupElement {title}>
	<div>
		<slot />
	</div>
</GroupElement>


