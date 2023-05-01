import './app.css'
import App from './App.svelte'
import './i18n';

Howler.autoUnlock = false;

const app = new App({
	target: document.getElementById('app'),
})

export default app
