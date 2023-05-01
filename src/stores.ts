import {liveQuery} from "dexie";
import {writable} from "svelte/store";
import {db} from "./db";


export const state = liveQuery(async () => {
	const categories = await db.groups.toArray();

	await Promise.all(
		categories.map(async group => {
			group.sounds = await db.sounds.where("group").equals(group.id).toArray();
		})
	);

	return categories
});

export const editMode = writable(false);
export const editObject = writable<{
	type: string,
	id: number
} | null>({type: "app", id: 0});
