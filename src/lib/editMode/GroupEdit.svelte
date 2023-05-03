<script lang="ts">

	import Sortable from "sortablejs";
	import {onDestroy, onMount} from "svelte";
	import {db} from "../../db";
	import {editObject} from "../../stores";
	import {moveElement} from "../../utils/moveElement";
	import GroupElement from "../ui/GroupElement.svelte";

	export let id = -1;
	export let title = "";
	export let items = [];


	let el;
	let sort;

	function edit() {
		editObject.set({
			type: "group",
			id
		});

		return;
	}

	function onListUpdate(event) {
		const newAr = moveElement(items, event.oldIndex, event.newIndex);


		const dbUpdate = newAr.map((entry, i) => ({
			key: entry.id,
			changes: {
				position: i
			}
		}))

		db.sounds.bulkUpdate(dbUpdate);
	}

	function setDragData(data, dragEl) {
		data.setData("text", dragEl.dataset.soundid);
	}

	function onListAdd(event) {
		const soundId = event.originalEvent.dataTransfer.getData("text");
		console.log(event.from.dataset.groupid, event.to.dataset.groupid);
		console.log(items);

		const newList = [{id: +soundId, group: id}, ...items];

		console.log(newList)

		const newAr = moveElement(newList, 0, event.newIndex);


		const dbUpdate = newAr.map((entry, i) => ({
			key: entry.id,
			changes: {
				position: i,
				group: entry.group
			}
		}))

		console.log(dbUpdate)

		db.sounds.bulkUpdate(dbUpdate);

	}

	onMount(() => {
		sort = new Sortable(el, {
			animation: 250,
			group: "sounds",
			setData: setDragData,
			onUpdate: onListUpdate,
			onAdd: onListAdd
		});
	});

	onDestroy(() => {
		if (sort) {
			sort.destroy();
		}
	})

</script>

<GroupElement interactable={true} on:click={edit} selected={$editObject.type === "group" && $editObject.id === id} {title}>
	<div bind:this={el} data-groupid={id}>
		<slot />
	</div>
</GroupElement>


