<script lang="ts">
	export let icon = "";
</script>

<button on:click>
	{#if icon}
		<i class={"fa fa-"+icon}></i>
	{/if}

	<slot></slot>
</button>

<style lang="scss">
	button {
		width: 100%;
		padding: 0.5rem;
		cursor: pointer;
		color: white;
		border: 0;
		border: 2px solid hsl(0deg 0% 100% / 0%);
		border-radius: 5px;
		background: hsl(0deg 0% 100% / 10%);

		&:focus {
			outline: none;
		}

		i {
			margin-right: 0.4rem;
		}
	}
</style>
