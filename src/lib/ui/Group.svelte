<script lang="ts">
	import { setContext } from "svelte";
	import { writable } from "svelte/store";
	import GroupElement from "./GroupElement.svelte";
	import type { IGroupContext } from "../interfaces/interfaces";

	export const id = -1;
	export let title = "";

	setContext<IGroupContext>("group", {
		currentlyPlaying: writable(""),
	});
</script>

<GroupElement {title}>
	<div>
		<slot />
	</div>
</GroupElement>
