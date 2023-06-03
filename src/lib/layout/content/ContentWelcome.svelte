<script lang="ts">
	import Sound from "../../ui/Sound.svelte";
	import { setContext } from "svelte";
	import Card from "../../ui/intro/Card.svelte";
	import { scale, fly } from "svelte/transition";

	export const groups = []; //To hide the warning

	setContext("group", "demo");
</script>

<section class="grid" out:fly={{ x: -352 }}>
	<div class="box welcome" in:scale={{ start: 0.8, delay: 250 }}>
		<h1>Welcome to your <span>soundboard</span></h1>

		<div class="soundwaves" />
	</div>

	<div in:scale={{ start: 0.8, delay: 350 }}>
		<Card icon="account_circle" title="No account" />
	</div>

	<div in:scale={{ start: 0.8, delay: 450 }}>
		<Card icon="save" title="All local" />
	</div>

	<div in:scale={{ start: 0.8, delay: 550 }}>
		<Card icon="payments" title="Free" />
	</div>

	<div class="box info" in:scale={{ start: 0.8, delay: 750 }}>
		<p>Create your own custom soundboard directly in your browser.</p>
		<p>
			There is no need for an account! All your files and settings are stored locally on your
			device.
		</p>
		<p>Just click the "Edit" button at the top and start creating your own soundboard.</p>
	</div>

	<div in:scale={{ start: 0.8, delay: 650 }}>
		<Sound
			blob="src/assets/sound.mp3"
			id="demo"
			title="Intro Sound"
			waveform="/assets/soundwaves.png"
		/>
	</div>
</section>

<style lang="scss">
	@use "src/mixins";

	.grid {
		display: grid;
		width: 100%;
		padding: 0.5rem;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(5, auto);
		gap: 0.5rem;
		grid-template-areas:
			"welcome welcome welcome"
			"welcome welcome welcome"
			"info1 info2 info3"
			"sound sound sound"
			"info info info";

		:nth-child(1) {
			grid-area: welcome;
		}

		:nth-child(2) {
			grid-area: info1;
		}

		:nth-child(3) {
			grid-area: info2;
		}

		:nth-child(4) {
			grid-area: info3;
		}

		:nth-child(5) {
			grid-area: info;
		}

		:nth-child(6) {
			grid-area: sound;

			:global(> *) {
				width: 100%;
			}
		}

		@include mixins.responsive("small") {
			padding: 0;
			gap: 1rem;
			width: min(100vw, 1200px);
			grid-template-columns: repeat(5, 1fr);
			grid-template-rows: repeat(3, 1fr);
			grid-template-areas:
				"welcome welcome welcome sound sound"
				"welcome welcome welcome info info"
				"info1 info2 info3 info info";
		}
	}

	.box {
		border-radius: var(--radius-normal);
		background-color: var(--color-gray-900);
	}

	.welcome {
		position: relative;
		padding: 2rem;
		overflow: hidden;

		h1 {
			font-size: 2rem;
			line-height: 1;
			margin: 0;
			padding-bottom: 3rem;

			span {
				color: var(--color-primary);
			}
		}

		.soundwaves {
			position: absolute;
			top: 100%;
			right: 0;
			translate: 50% -50%;
			width: 200%;

			mask-image: url("/assets/soundwaves.png");
			-webkit-mask-image: url("/assets/soundwaves.png");
			mask-size: cover;
			-webkit-mask-size: cover;
			mask-position: center;
			-webkit-mask-position: center;
			mask-repeat: no-repeat;
			-webkit-mask-repeat: no-repeat;

			aspect-ratio: 20/9;

			background-color: var(--color-primary);
		}

		@include mixins.responsive("small") {
			padding: 3rem;

			h1 {
				font-size: 3.5rem;
				line-height: 1;
				margin: 0;
			}
		}
	}

	.info {
		font-size: 1.2rem;
		padding: 2rem;

		p {
			margin: 0 0 1rem;
		}
	}
</style>
