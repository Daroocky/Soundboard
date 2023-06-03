<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { t } from "svelte-i18n";
	import ConfigButton from "./ConfigButton.svelte";

	const dispatcher = createEventDispatcher();

	export let confirmLabel = $t("form.delete.confirm");

	let confirmState = false;
	let startAction = new Date();

	function onButtonClick() {
		if (!confirmState) {
			confirmState = true;
			startAction = new Date();
			return;
		}

		const now = new Date();
		const interactionTime = now.getTime() - startAction.getTime();

		if (interactionTime >= 350) {
			dispatcher("delete");
		}
	}

	function deactivateConfirm() {
		if (!confirmState) {
			return;
		}

		confirmState = false;
	}
</script>

<ConfigButton
	danger={confirmState}
	icon="delete"
	on:click={onButtonClick}
	on:focusout={deactivateConfirm}
	on:mouseleave={deactivateConfirm}
>
	{#if confirmState}
		{confirmLabel}
	{:else}
		<slot />
	{/if}
</ConfigButton>
