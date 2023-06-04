<script lang="ts">
	import { t } from "svelte-i18n";
	import { editMode, editObject } from "../../stores";
	import ConfigButton from "../config/inputs/ConfigButton.svelte";
	import Icon from "../ui/Icon.svelte";
	import CookieBanner from "./CookieBanner.svelte";

	function toggleEdit() {
		editMode.set(!$editMode);

		if ($editMode) {
			editObject.set({
				type: "app",
				id: 0,
			});
			return;
		}

		setTimeout(() => {
			editObject.set(null);
		}, 250);
	}

	function showAppConfig() {
		editObject.set({
			type: "app",
			id: 0,
		});
	}
</script>

<header>
	<div class="head">
		<h1>
			<Icon name="graphic_eq" />
			Soundboard
		</h1>

		<div class="buttons">
			<ConfigButton icon={$editMode ? "screen_record" : "settings"} on:click={toggleEdit}>
				{$editMode ? $t("header.live") : $t("header.edit")}
			</ConfigButton>
		</div>
	</div>

	<CookieBanner />
</header>

<style lang="scss">
	.head {
		display: flex;
		justify-content: space-between;
		padding: 0.5rem 1rem;
		border-bottom: 1px solid var(--color-gray-500);

		h1 {
			font-size: 1.5rem;
			font-weight: var(--weight-bold);
			display: flex;
			align-items: center;
			margin: -0.2rem 0;
			padding: 0;
			text-transform: uppercase;
			color: var(--color-primary);
			gap: 0.4rem;
		}

		.buttons {
			display: flex;
			gap: 0.5rem;
		}
	}
</style>
