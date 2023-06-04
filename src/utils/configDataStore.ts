import { debounce, isEqual } from "radash";
import { onDestroy, onMount } from "svelte";
import { writable } from "svelte/store";

export const createConfigStore = (loadDataCallback) => {
	const data = writable(null);

	let oldData = null;

	let dataChangeCallback;
	let storeUnsubscriber;

	const loadData = async () => {
		const newData = await loadDataCallback();
		data.set(newData);
		return newData;
	};

	const reloadData = async (id) => {
		oldData = null;
		return await loadData();
	};

	const onDataChanged = (callback) => {
		dataChangeCallback = callback;
	};

	const triggerDataChanged = debounce({ delay: 250 }, (newData) => {
		if (dataChangeCallback) {
			//console.log("Update Database", newData);
			dataChangeCallback(newData);
		}
	});

	onMount(() => {
		loadData();

		storeUnsubscriber = data.subscribe((newData) => {
			if (isEqual(oldData, newData)) {
				return;
			}

			if (oldData != null) {
				triggerDataChanged(newData);
			}

			oldData = { ...newData };
		});
	});

	onDestroy(() => storeUnsubscriber());

	return { onDataChanged, reloadData, data };
};
