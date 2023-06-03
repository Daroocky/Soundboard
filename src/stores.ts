import { liveQuery } from "dexie";
import { locale } from "svelte-i18n";
import { writable } from "svelte/store";
import { db } from "./db";

export const VERSION = "1.0.0";

export const changelogOpen = writable(false);

export const state = liveQuery(async () => {
	const app = await db.app.toCollection().first();

	if (!app) {
		db.app.add({
			language: "en",
			version: VERSION,
		});
		return;
	}

	if (app.version != VERSION) {
		changelogOpen.set(true);

		db.app.update(app.id, { version: VERSION });
	}

	locale.set(app.language);

	const groups = await db.groups.orderBy("position").toArray();

	await Promise.all(
		groups.map(async (group) => {
			group.sounds = await db.sounds.where("group").equals(group.id).sortBy("position");
		})
	);

	return { ...app, groups };
});

export const editMode = writable(false);
export const lockCurrentEditSelection = writable(false);

const editObjectStore = () => {
	const { set, subscribe } = writable(null);

	let isLocked = false;

	lockCurrentEditSelection.subscribe((data) => (isLocked = data));

	return {
		set(data) {
			if (!isLocked) {
				set(data);
			}
		},
		subscribe,
	};
};

export const editObject = editObjectStore();

export const shortcutTrigger = writable(null);
