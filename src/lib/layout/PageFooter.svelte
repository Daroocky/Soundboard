<script lang="ts">
	import { t } from "svelte-i18n";
	import { VERSION, changelogOpen } from "../../stores";
	import Model from "../ui/Model.svelte";

	let imprintModel;

	function openChangelog() {
		changelogOpen.set(true);
	}
</script>

<Model title="Impressum" bind:modal={imprintModel}>
	<p>Stefan Roock</p>
	<p>Industriestraße 35 <br />40227 Düsseldorf</p>
	<p>Kontakt: soundboard[at]email.de</p>
</Model>

<footer>
	<ul>
		<li>&copy; Stefan Roock</li>
		<li><button on:click={openChangelog}>v{VERSION}</button></li>
		<li><button on:click={imprintModel.open}>Imprint</button></li>
		<li><a href="https://bmc.link/stefanroock" target="_blank">Buy me a coffee</a></li>
	</ul>
</footer>

<style lang="scss">
	@use "src/mixins";

	footer {
		position: absolute;
		z-index: 100;
		right: 0;
		bottom: 0;
		left: 0;
		padding: 0.5rem 0;
		padding-top: 2rem;
		color: var(--color-gray-400);
		background: linear-gradient(0deg, var(--color-gray-800) 60%, transparent);

		ul {
			display: flex;
			margin: 0;
			padding: 0;
			gap: 1rem;
			overflow: auto;
			padding: 0 1rem;
		}

		li {
			list-style: none;
			white-space: nowrap;
		}

		a,
		button {
			color: inherit;
			background: transparent;
			border: none;
			padding: 0;
			text-decoration: underline;
			cursor: pointer;
		}
	}
</style>
