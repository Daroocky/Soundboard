<script lang="ts">
	import Sortable from "sortablejs";
	import { createEventDispatcher, onDestroy, onMount } from "svelte";
	import { dndState } from "./dndZoneStore";

	export let items: unknown[];
	export let group = "";

	let sortable;
	let el;
	const dispatch = createEventDispatcher();

	const moveElement = (array, fromIndex, toIndex) => {
		const arrayCopy = [...array];
		const element = arrayCopy.splice(fromIndex, 1)[0];

		arrayCopy.splice(toIndex, 0, element);

		return arrayCopy;
	};

	function onUpdate(event) {
		items = moveElement(items, event.oldIndex, event.newIndex);
		dispatch("update", items);
	}

	function onAdd(event) {
		items = moveElement([$dndState, ...items], 0, event.newIndex);
		dispatch("add", items);
	}

	function onRemove(event) {
		items.splice(event.oldIndex, 1);
		items = items;
		dispatch("remove", items);
	}

	function onStart(event) {
		dndState.set(items[event.oldIndex]);
	}

	function onEnd() {
		dndState.set(null);
	}

	onMount(() => {
		sortable = new Sortable(el, {
			handle: ".handle",
			animation: 250,
			group,
			onUpdate,
			onAdd,
			onRemove,
			onStart,
			onEnd,
		});
	});

	onDestroy(() => {
		if (sortable) {
			sortable.destroy();
		}
	});
</script>

<div bind:this={el} class="drag-zone" class:dragging={$dndState}>
	{#each items as item (item.id)}
		<slot {item} />
	{/each}
	{#if !$dndState}
		<slot name="additional" />
	{/if}
</div>

<style>
	:global(.sortable-ghost) {
		opacity: 0.5;
	}
</style>
