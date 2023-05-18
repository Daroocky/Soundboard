<script>
    import Sound from "../../ui/Sound.svelte";
    import {setContext} from "svelte";
    import Icon from "../../ui/Icon.svelte";

    setContext("group", "demo");
</script>

<section class="grid">
	<div class="box welcome">
		<h1>Welcome to your soundboard</h1>
	</div>

	<div class="stat">
		<div class="card">
			<div class="face front">
				<Icon name="account_circle" />
				<span>No account</span>
			</div>
			<div class="face back">
				<p>You don't have to create a account. Just click on "Edit" and start creating your soundboard.</p>
			</div>
		</div>
	</div>

	<div class="stat">
		<div class="card">
			<div class="face front">
				<Icon name="save" />
				<span>All local</span>
			</div>
			<div class="face back">
				<p>All files and settings are stored locally on your device.</p>
			</div>
		</div>
	</div>

	<div class="box">
		<p>Create your own custom soundboard directly in your browser.</p>
		<ul>
			<li>Create groups to organise your sounds</li>
			<li>Loop sounds</li>
			<li>Change the volume of each sound or each group</li>
		</ul>
	</div>

	<Sound
	 blob="src/assets/sound.mp3"
	 id="demo"
	 title="Intro Sound"
	 waveform=""
	/>

	<div class="stat">
		<div class="card">
			<div class="face front">
				<Icon name="payments" />
				<span>It's free</span>
			</div>
			<div class="face back">
				<p>This tool is completely free. But if you like you can support our work here.</p>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.grid {
		display: grid;
		width: min(100vw, 1200px);
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(3, 1fr);
		gap: 1rem;
		grid-template-areas:
    "welcome welcome welcome info1 info2"
    "welcome welcome welcome info info"
    "info3 sound sound info info";

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
			grid-area: info;
		}

		:global(:nth-child(5)) {
			grid-area: sound;
		}

		:nth-child(6) {
			grid-area: info3;
		}
	}

	.box {
		border-radius: var(--radius-normal);
		background-color: var(--color-gray-900);
	}

	.welcome {
		padding: 3rem;

		h1 {
			font-size: 3.5rem;
			line-height: 1;
			margin: 0;
		}
	}

	.stat {
		perspective: 600px;

		.card {
			position: relative;
			width: 100%;
			height: 100%;
			transition: transform 1s;
			transform-style: preserve-3d;

			&:hover {
				transform: rotateY(180deg);
			}
		}

		.face {
			position: absolute;
			border-radius: var(--radius-normal);
			inset: 0;
			backface-visibility: hidden;
		}

		.front {
			font-size: 3rem;
			display: flex;
			align-items: center;

			flex-direction: column;
			justify-content: center;
			background-color: var(--color-gray-900);

			gap: 0.5rem;

			span {
				font-size: 2rem;
			}
		}

		.back {
			transform: rotateY(180deg);
			background-color: var(--color-accent-purple);

			p {
				font-size: 1rem;
				margin: 0;
				padding: 1rem;
			}
		}

	}
</style>
