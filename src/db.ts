import Dexie, {type Table} from 'dexie';

export interface App {
	id?: number;
	language: string;
}

export interface Sound {
	id?: number;
	group: number;
	title: string;
	color: string;
	shortcut: string;
	loop: boolean;
	solo: boolean;
	pausable: boolean;
	volume: number;
	file: {
		filename: string,
		blob: string
	}
}

export interface Group {
	id?: number;
	title: string;
	volume: number;
	sounds?: Sound[];
}

export class Database extends Dexie {
	app!: Table<App>;
	sounds!: Table<Sound>;
	groups!: Table<Group>;

	constructor() {
		super('soundboard');
		this.version(1).stores({
			app: "++id",
			sounds: '++id, title, group',
			groups: "++id, title"
		});
	}
}

export const db = new Database();
