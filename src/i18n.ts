import {addMessages, getLocaleFromNavigator, init, locale, register} from 'svelte-i18n';
import en from "./assets/i18n/en.json";

export const initI18n = () => {
	addMessages('en', en);
	register('de', () => import("./assets/i18n/de.json"));


	init({
		fallbackLocale: 'en',
		initialLocale: getLocaleFromNavigator(),
	});

	locale.set(getLocaleFromNavigator())

}

