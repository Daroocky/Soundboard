import {addMessages, getLocaleFromNavigator, init, register} from 'svelte-i18n';
import en from "./assets/i18n/en.json";

addMessages('en', en);
register('de', () => import("./assets/i18n/de.json"));


init({
	fallbackLocale: 'en',
	initialLocale: getLocaleFromNavigator(),
});
