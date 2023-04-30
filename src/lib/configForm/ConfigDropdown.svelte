<script lang="ts">
	import {createEventDispatcher} from "svelte";
	import {clickOutside} from "../../utils/clickOutside";

	type Option = { value: string } & { [name: string]: unknown };

	const dispatch = createEventDispatcher();
	export let label = "";
	export let value = "";
	export let options: Option[] = [];

	let open = false;
	let currentOption: Option;
	$: currentOption = options.find(option => option.value == value);


	function selectOption(option: Option) {
		value = option.value;
		open = false;
		dispatch("input", option)
	}

</script>

<div class="dropdown" on:click_outside={() => open = false} use:clickOutside>
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
		<i class="fa fa-chevron-down"></i>
	</button>
	<ul class="options" class:open role="listbox">
		{#each options as option (option.value)}
			<li
			 class="option"
			 role="option"
			 aria-selected={value == option.value}
			 on:click={() => selectOption(option)}>
				<span><slot {option}>{option.value}</slot></span>
				<i class="fa fa-check"></i>
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
		margin-bottom: 0.2rem;
		color: hsl(0deg 0% 100% / 60%);
	}

	.dropdown {
		position: relative;
	}

	button {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0.5rem;
		cursor: pointer;
		color: white;
		border: 2px solid hsl(0deg 0% 100% / 0%);
		border-radius: 5px;
		background: hsl(0deg 0% 100% / 10%);

		i {
			transition: rotate 250ms ease-in-out;
		}

		&:focus {
			outline: none;
		}

		&[aria-expanded="true"] {
			i {
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
		width: 100%;
		margin: 0.5rem 0 0;
		padding: 0.5rem;
		transition: all 250ms ease-in-out;
		pointer-events: none;
		opacity: 0;
		color: white;
		border: 2px solid hsl(0deg 0% 100% / 0%);
		border-radius: 5px;
		background: hsl(0deg 0.79% 24.9%);
		translate: 0 -1rem;
	}

	.option {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem;
		list-style: none;
		cursor: pointer;
		border-radius: 5px;

		i {
			display: none;
		}

		&:hover {
			background: hsl(0deg 0% 100% / 10%);
		}

		&[aria-selected="true"] {
			i {
				display: block;
			}
		}
	}
</style>
