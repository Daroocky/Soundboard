<script lang="ts">
	import {createEventDispatcher} from "svelte";
	import {clickOutside} from "../../../utils/clickOutside";
	import Icon from "../../ui/Icon.svelte";

	type Option = { value: string } & { [name: string]: unknown };

	const dispatch = createEventDispatcher();
	export let label = "";
	export let value = "";
	export let options: Option[] = [];

	let open = false;
	let currentOption: Option;
	let currentFocus;

	$: {
		options = options.map(option => {
			if (typeof option !== "object") {
				return {
					value: option
				}
			}

			return option;
		})
	}

	$: {
		currentOption = options.find(option => option.value == value);

		if (!currentOption) {
			value = options[0].value;
			currentOption = options.find(option => option.value == value);
		}
	}

	function selectOption(option: Option) {
		value = option.value;
		open = false;
		dispatch("input", option)
	}

	enum Actions {
		Open,
		Close,
		Next,
		Previous,
		SelectOption
	}

	function getKeyboardAction(key: string) {
		if (key == "Tab") {
			return Actions.Close
		}

		if (open) {
			if (key === "Escape") {
				return Actions.Close;
			}

			if (key === "ArrowDown") {
				return Actions.Next
			}

			if (key === "ArrowUp") {
				return Actions.Previous
			}

			if (key === "Enter" || key === " ") {
				return Actions.SelectOption;
			}

			return null;
		}

		if (key === "Enter" || key === " ") {
			return Actions.Open;
		}

		return null;
	}

	function handleKeyboard(event) {
		const action = getKeyboardAction(event.key);

		if (action != Actions.Close) {
			event.preventDefault();
		}

		if (action == Actions.Open) {
			open = true;
			currentFocus = options.findIndex(option => value == option.value);
		}

		if (action == Actions.Next) {
			currentFocus++;

			if (currentFocus >= options.length) {
				currentFocus = 0;
			}
		}

		if (action == Actions.Previous) {
			currentFocus--;

			if (currentFocus < 0) {
				currentFocus = options.length - 1;
			}
		}

		if (action == Actions.Close) {
			open = false;
		}

		if (action == Actions.SelectOption) {
			selectOption(options[currentFocus]);
		}
	}
</script>

<div class="dropdown" on:click_outside={() => open = false} on:keydown={handleKeyboard} use:clickOutside>
	<label on:click|preventDefault={() => open = !open}>
		<span class="label">{label}</span>

		<select bind:value>
			{#each options as option (option.value)}
				<option value={option.value}>{option.value}</option>
			{/each}
		</select>
	</label>

	<button aria-expanded={open} on:click={() => open = !open} role="combobox">
		<span>
			{#if currentOption}
			<slot option="{currentOption}">{currentOption.value}</slot>
			{/if}
		</span>
		<Icon name="expand_more" />
	</button>
	<ul class="options" class:open role="listbox">
		{#each options as option, i (option.value)}
			<li
			 class="option"
			 class:selected={i === currentFocus}
			 role="option"
			 aria-selected={value == option.value}
			 on:click={() => selectOption(option)}>
				<span><slot {option}>{option.value}</slot></span>
				<Icon name="check" />
			</li>
		{/each}
	</ul>
</div>


<style lang="scss">
	select {
		display: none;
	}

	.label {
		font-size: 0.9rem;
		display: block;
		margin-bottom: 0;
		color: var(--color-gray-400);
	}

	.dropdown {
		position: relative;
	}

	button {
		font-size: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0.5rem;
		cursor: pointer;
		color: var(--color-gray-100);
		border: 2px solid var(--color-gray-500);
		border-radius: 5px;
		background: var(--color-gray-500);

		:global(.icon) {
			transition: rotate 250ms ease-in-out;
		}

		&:focus-visible {
			border-color: var(--color-primary);
			outline: none;
		}

		&[aria-expanded="true"] {
			:global(.icon) {
				rotate: 180deg;
			}

			& + .options {
				pointer-events: all;
				opacity: 1;
				translate: 0;
			}
		}
	}

	.options {
		position: absolute;
		z-index: 10;
		overflow: auto;
		width: 100%;
		max-height: 25vh;
		margin: 0.5rem 0 0;
		padding: 0.5rem;
		transition: all 250ms ease-in-out;
		pointer-events: none;
		opacity: 0;
		color: var(--color-gray-100);
		border: 2px solid var(--color-gray-500);
		border-radius: var(--radius-normal);
		background: var(--color-gray-500);
		translate: 0 -1rem;
	}

	.option {
		font-size: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem;
		list-style: none;
		cursor: pointer;
		border-radius: var(--radius-normal);

		:global(.icon) {
			display: none;
		}

		&:hover, &.selected {
			background: var(--color-gray-600);
		}

		&[aria-selected="true"] {
			:global(.icon) {
				display: block;
			}
		}
	}
</style>
