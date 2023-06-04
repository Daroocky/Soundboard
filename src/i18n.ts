import { addMessages, getLocaleFromNavigator, init, locale, register } from "svelte-i18n";
import en from "./assets/i18n/en.json";

export const initI18n = () => {
	addMessages("en-US", en);
	register("de-DE", () => import("./assets/i18n/de.json"));

	init({
		fallbackLocale: "en-US",
		initialLocale: getLocaleFromNavigator(),
	});

	locale.set(getLocaleFromNavigator());
};
