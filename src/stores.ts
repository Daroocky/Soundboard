import {liveQuery} from "dexie";
import {locale} from "svelte-i18n";
import {writable} from "svelte/store";
import {db} from "./db";


export const state = liveQuery(async () => {
	const app = await db.app.toCollection().first();

	if (!app) {
		db.app.add({
			language: "en"
		});
		return;
	}

	locale.set(app.language);

	const groups = await db.groups.orderBy("position").toArray();

	await Promise.all(
		groups.map(async group => {
			group.sounds = await db.sounds.where("group").equals(group.id).sortBy("position")
		})
	);

	return {...app, groups}
});

export const editMode = writable(false);
export const editObject = writable<{ type: string, id: number } | null>(null);
