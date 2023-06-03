<script lang="ts">
	import { title } from "radash";
	import Changelog from "./lib/layout/Changelog.svelte";
	import PageHeader from "./lib/layout/PageHeader.svelte";
	import PageMain from "./lib/layout/PageMain.svelte";
	import PageSidebar from "./lib/layout/PageSidebar.svelte";
	import Model from "./lib/ui/Model.svelte";
	import { VERSION, changelogOpen, editMode } from "./stores";

	let imprintModel;

	function openChangelog() {
		changelogOpen.set(true);
	}
</script>

<Changelog />

<Model title="Impressum" bind:modal={imprintModel}>
	<p>Stefan Roock</p>
	<p>Industriestraße 35 <br />40227 Düsseldorf</p>
	<p>Kontakt: soundboard[at]email.de</p>
</Model>

<div class="page" class:editMode={$editMode}>
	<PageHeader />
	<PageMain />
	<PageSidebar />
</div>

<footer>
	<ul>
		<li>&copy; Stefan Roock</li>
		<li><button on:click={openChangelog}>v{VERSION}</button></li>
		<li><button on:click={imprintModel.open}>Imprint</button></li>
		<li><a href="https://bmc.link/stefanroock" target="_blank">Buy me a coffee</a></li>
	</ul>
</footer>

<style lang="scss">
	@use "mixins";

	.page {
		position: relative;
		z-index: 1;
		display: grid;
		overflow: hidden;
		height: 100dvh;
		transition: all 250ms ease-in-out;
		grid-template-columns: 1fr;

		grid-template-rows: auto 1fr;

		&.editMode {
			:global(aside) {
				translate: 0 0;
			}
		}

		:global(header) {
			grid-area: 1 / 1 / 2 / 2;
		}

		:global(main) {
			grid-area: 2 / 1 / 3 / 1;
			padding-bottom: 3rem;
		}

		:global(aside) {
			transition: translate 250ms ease-in-out;
			translate: 100% 0;
			grid-area: 2 / 1 / 3 / 1;
			padding-bottom: 3rem;
		}

		@include mixins.responsive("small") {
			grid-template-columns: 1fr 0;
			grid-template-rows: auto 1fr;

			&.editMode {
				grid-template-columns: 1fr 22rem;
			}

			:global(header) {
				grid-area: 1 / 1 / 2 / 3;
			}

			:global(main) {
				grid-area: 2 / 1 / 3 / 2;
			}

			:global(aside) {
				grid-area: 2 / 2 / 3 / 3;
			}
		}
	}

	footer {
		position: absolute;
		z-index: 100;
		right: 0;
		bottom: 0;
		left: 0;
		padding: 0.5rem 1rem;
		padding-top: 2rem;
		color: var(--color-gray-400);
		background: linear-gradient(0deg, var(--color-gray-800) 60%, transparent);

		ul {
			display: flex;
			margin: 0;
			padding: 0;
			gap: 1rem;
		}

		li {
			list-style: none;
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
