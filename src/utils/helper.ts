export const validShortcutKey = (key) => {
	const keyCleaned = key.toUpperCase();
	const regex = /^[A-Z0-9]{1}$/;
	return regex.test(keyCleaned);
}
