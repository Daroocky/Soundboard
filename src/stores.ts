import {liveQuery} from "dexie";
import {writable} from "svelte/store";
import {db} from "./db";


export const state = liveQuery(async () => {
	const categories = await db.categories.toArray();

	await Promise.all(
		categories.map(async category => {
			category.sounds = await db.audios.where("id").anyOf(category.audios).toArray();
		})
	);

	return categories
});

export const editMode = writable(true);
export const editObject = writable<{
	type: string,
	id: number
} | null>({type: "app", id: 0});
