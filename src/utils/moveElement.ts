export const moveElement = (array, fromIndex, toIndex) => {
	const arrayCopy = [...array];
	const element = arrayCopy.splice(fromIndex, 1)[0];

	arrayCopy.splice(toIndex, 0, element);

	return arrayCopy;
}
