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
			if(!howl.loop()) {
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

		if(!howl.playing()) {
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
 on:click|stopPropagation
 disabled={isLoading}
 class:isPlaying
 class:isFading
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
	  --progress: 0%;
	  --color: hsl(237, 100%, 70%);

    border-radius: 8px;
    border: 2px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    color: rgba(255, 255, 255, 0.87);
    background-color: #1a1a1a;
    cursor: pointer;
    transition: all 0.5s;
    position: relative;
    overflow: clip;
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
    inset: 0;
    background: linear-gradient(90deg, var(--color) var(--progress, 0%), transparent var(--progress, 0%));
  }

  .label {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
