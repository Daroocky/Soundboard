export const validShortcutKey = (key) => {
	const keyCleaned = key.toUpperCase();
	const regex = /^[A-Z0-9]{1}$/;
	return regex.test(keyCleaned);
}

export const mapColor = (color: string) => {
	return `var(--color-${color})`;
}

export const mapAccentColor = (color: string) => {
	return `var(--color-accent-${color})`;
}
