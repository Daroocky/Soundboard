<script lang="ts">
	import { changelogOpen } from "../../stores";
	import Model from "../ui/Model.svelte";

	let modal;

	$: {
		if (modal) {
			if ($changelogOpen) {
				window.gtag("event", "changelog_viewd");
				modal.open();
			} else {
				modal.close();
			}
		}
	}

	function changelogClosed() {
		changelogOpen.set(false);
	}
</script>

<Model title="Changelog" bind:modal on:close={changelogClosed}>
	<div class="version">
		<h3>v1.00</h3>
		<ul>
			<li>Release</li>
		</ul>
	</div>
</Model>

<style lang="scss">
</style>
