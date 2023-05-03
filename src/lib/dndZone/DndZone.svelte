<script lang="ts">
	import Sortable from "sortablejs";
	import {createEventDispatcher, onDestroy, onMount} from "svelte";
	import {dndState} from "./dndZoneStore";

	export let items;
	export let group = "";

	let sortable;
	let el;
	const dispatch = createEventDispatcher();

	const moveElement = (array, fromIndex, toIndex) => {
		const arrayCopy = [...array];
		const element = arrayCopy.splice(fromIndex, 1)[0];

		arrayCopy.splice(toIndex, 0, element);

		return arrayCopy;
	}


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
		dndState.set(null)
	}

	onMount(() => {
		sortable = new Sortable(el, {
			animation: 250,
			group,
			onUpdate,
			onAdd,
			onRemove,
			onStart,
			onEnd
		});
	});

	onDestroy(() => {
		if (sortable) {
			sortable.destroy();
		}
	})
</script>

<div bind:this={el}>
	{#each items as item(item.id)}
		<slot {item} />
	{/each}
</div>

<style>
  :global(.sortable-ghost) {
    opacity: 0;
  }
</style>
