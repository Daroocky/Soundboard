<script lang="ts">
	export let name;
</script>

<span class="icon">{name}</span>

<style lang="scss">
	@font-face {
		font-family: "Material Symbols Outlined";
		font-style: normal;
		font-weight: 100 700;
		src: url(https://fonts.gstatic.com/s/materialsymbolsoutlined/v108/kJEhBvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oFsLjBuVY.woff2) format("woff2");
	}

	.icon {
		font-family: "Material Symbols Outlined";
		font-weight: normal;
		font-style: normal;
		line-height: 1;
		display: inline-block;
		white-space: nowrap;
		letter-spacing: normal;
		text-transform: none;
		word-wrap: normal;
		font-variation-settings: "FILL" 0,
		"wght" 400,
		"GRAD" 0,
		"opsz" 40;
		direction: ltr;
		-webkit-font-feature-settings: "liga";
		-webkit-font-smoothing: antialiased;
	}
</style>
