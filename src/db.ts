import Dexie, {type Table} from 'dexie';

export interface Audio {
	id?: number;
	name: string;
	src: string;
}

export interface Category {
	id?: number;
	title: string;
	single: boolean;
	audios: number[];

	sounds?: Audio[];
}

export class Database extends Dexie {
	audios!: Table<Audio>;
	categories!: Table<Category>;

	constructor() {
		super('soundboard');
		this.version(2).stores({
			audios: '++id, name',
			categories: "++id, title, single, *audios"
		});
	}
}

export const db = new Database();
