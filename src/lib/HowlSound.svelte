<script lang="ts">
	import {Howl, HowlOptions} from "howler";
	import {createEventDispatcher, onMount} from "svelte";

	const dispatch = createEventDispatcher();

	export let config: HowlOptions;

	let howl;

	let progress = 0;
	let isPlaying = false;
	let isFading = false;
	let isLoading = true;

	onMount(() => {
		howl = new Howl(config);

		howl.on("play", () => {
			isPlaying = true;
			seek();

			dispatch("play");
		});

		howl.on("pause", () => {
			isPlaying = false;
			dispatch("pause");
		});

		howl.on("stop", () => {
			isPlaying = false;
			dispatch("stop");
		});

		howl.on("end", () => {
			if (!howl.loop()) {
				isPlaying = false;
			}
			dispatch("end");
		})

		howl.on("load", (e) => {
			isLoading = false;
			dispatch("loaded");
		});
	})

	const seek = () => {
		progress = howl.seek() / howl.duration() * 100;

		if (!howl.playing()) {
			return
		}

		requestAnimationFrame(seek);
	}

	const play = () => {
		return howl.play();
	}

	const stop = () => {
		howl.stop();
	}

	const pause = () => {
		howl.pause();
	}

	const playing = () => {
		return howl.playing();
	}

	const fadeOut = () => {
		isFading = true;

		howl.once("fade", () => {
			howl.pause();
			isFading = false
		})

		howl.fade(1, 0, 3000);
	}

	const fadeIn = () => {
		isFading = true;

		howl.once("fade", () => {
			isFading = false
		})

		howl.play();
		howl.fade(0, 1, 3000);
	}

	export const sound = {
		play,
		pause,
		stop,
		playing,
		fadeIn,
		fadeOut
	}
</script>

<button
 class:isFading
 class:isPlaying
 disabled={isLoading}
 on:click|stopPropagation
 style:--progress={progress+"%"}

>
	<span class="progress"></span>
	<span class="label">
		<slot></slot>
	</span>
	&nbsp;
</button>

<style>
  button {
    font-family: inherit;
    font-size: 1em;

    font-weight: 500;
    position: relative;
    overflow: clip;
    padding: 0.6em 1.2em;
    cursor: pointer;
    transition: all 0.5s;
    color: var(--color-gray-100);
    border: 2px solid transparent;
    border-radius: 8px;
    background-color: var(--color-gray-900);
    --progress: 0%;
    --color: hsl(237, 100%, 70%);
  }

  button[disabled] {
    opacity: 0.5;
  }

  button:hover {
    border-color: var(--color);
  }

  button.isPlaying {
    border-color: var(--color);
  }

  button.isFading {
    --color: hsl(271, 100%, 70%)
  }

  .progress {
    position: absolute;
    background: linear-gradient(90deg, var(--color) var(--progress, 0%), transparent var(--progress, 0%));
    inset: 0;
  }

  .label {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    inset: 0;
  }
</style>
