import './app.scss'
import App from './App.svelte'
import {initI18n} from "./i18n";

initI18n();

const app = new App({
	target: document.getElementById('app'),
})

export default app
