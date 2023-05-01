<script lang="ts">
	import {t} from "svelte-i18n";
	import {editMode, editObject} from "../../../stores";
	import ConfigButton from "../../configForm/ConfigButton.svelte";
	import Icon from "../Icon.svelte";

	function toggleEdit() {
		editMode.set(!$editMode);

		if ($editMode) {
			editObject.set({
				type: "app",
				id: 0
			});
			return;
		}

		setTimeout(() => {
			editObject.set(null);
		}, 250)

	}
</script>

<header>
	<h1>
		<Icon name="graphic_eq" />
		Soundboard
	</h1>


	<div>
		<ConfigButton icon={$editMode ? "screen_record" : "edit"} on:click={toggleEdit}>
			{$editMode ? $t("header.live") : $t("header.edit")}
		</ConfigButton>
	</div>
</header>

<style lang="scss">
	header {
		display: flex;
		justify-content: space-between;
		padding: 0.5rem 1rem;
		border-bottom: 1px solid var(--color-gray-500);
	}

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
</style>
