import { type Writable } from "svelte/store";
export interface IGroupContext {
	currentlyPlaying: Writable<string>;
}
