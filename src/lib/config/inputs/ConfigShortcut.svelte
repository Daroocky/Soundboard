<script lang="ts">
	import { t } from "svelte-i18n";
	import { createEventDispatcher } from "svelte";
	import { validShortcutKey } from "../../../utils/helper";
	import Icon from "../../ui/Icon.svelte";

	export let label = "";
	export let value = "";

	let el;
	const dispatch = createEventDispatcher();

	function onKey(event) {
		const { key } = event;

		if (validShortcutKey(key)) {
			value = key.toUpperCase();
			dispatch("input", value);
		}
	}

	function clear() {
		value = "";
		dispatch("input", value);
	}

	function focusInput() {
		el.focus();
	}
</script>

<div>
	<span class="label" on:click={focusInput}>{label}</span>
	<div class="shortcutInput">
		<div bind:this={el} class="input" on:keyup={onKey} tabindex="0">
			<Icon name="keyboard" />
			<div class="value">
				{#if !value}
					<span class="placeholder">{$t("form.shortcut.placeholder")}</span>
				{/if}
				{value}
			</div>
		</div>
		<button class="clear" on:click={clear}>
			<Icon name="backspace" />
		</button>
	</div>
</div>

<style lang="scss">
	.label {
		font-size: 0.9rem;
		display: block;
		margin-bottom: 0;
		color: var(--color-gray-400);
	}

	.shortcutInput {
		display: flex;
		height: 2.4rem;
		gap: 0.2rem;
	}

	.input {
		font-size: 1rem;
		line-height: normal;
		display: flex;
		align-items: center;
		width: 100%;
		padding: 0.5rem;
		cursor: pointer;
		color: var(--color-gray-100);
		border: 2px solid var(--color-gray-500);
		border-radius: var(--radius-normal) var(--radius-small) var(--radius-small) var(--radius-normal);
		background: var(--color-gray-700);

		gap: 0.5rem;

		&:focus {
			border-color: var(--color-primary);
			outline: none;
		}
	}

	.placeholder {
		color: var(--color-gray-400);
	}

	.value {
		flex: 1;
	}

	.clear {
		font-size: 1rem;
		line-height: normal;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3rem;
		padding: 0.5rem;
		cursor: pointer;
		color: var(--color-gray-100);
		border: 2px solid var(--color-gray-500);
		border-radius: var(--radius-small) var(--radius-normal) var(--radius-normal) var(--radius-small);
		background: var(--color-gray-500);

		&:focus-visible {
			border-color: var(--color-primary);
			outline: none;
		}
	}
</style>
