import { db } from "../../db";
import { editObject } from "../../stores";

export async function createNewGroup() {
	const addedGroupId = await db.groups.add({
		title: "",
		volume: 100,
		position: Date.now(),
	});

	editObject.set({
		type: "group",
		id: addedGroupId,
	});
}

export async function createNewSound(groupId) {
	const addedSoundId = await db.sounds.add({
		title: "",
		position: Date.now(),
		color: "",
		group: groupId,
		file: { blob: "", filename: "", waveform: "" },
		loop: false,
		pauseable: false,
		shortcut: "",
		solo: false,
		volume: 100,
	});

	editObject.set({
		type: "audio",
		id: addedSoundId,
	});
}
