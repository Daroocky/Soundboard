<script>
    import Icon from "../Icon.svelte";

    export let icon;
    export let title;

    let flipped = false;

    function flipCard() {
        flipped = !flipped;
    }
</script>

<a class="stat" href="#" on:click|preventDefault={flipCard}>
	<div class="card" class:flipped>
		<div class="face front">
			<span class="flip"><Icon name="north_east" /></span>
			<Icon name={icon} />
			<span>{title}</span>
		</div>
		<div class="face back">
			<span class="flip"><Icon name="south_west" /></span>
			<slot></slot>
		</div>
	</div>
</a>

<style lang="scss">
	.stat {
		text-decoration: none;
		color: var(--color-gray-100);
		perspective: 600px;

		.card {
			position: relative;
			width: 100%;
			height: 100%;
			transition: transform 1s;
			transform-style: preserve-3d;

			&.flipped {
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

			.flip {
				font-size: 1rem;
				position: absolute;
				top: 0.5rem;
				right: 0.5rem;
			}

			span {
				font-size: 2rem;
			}
		}

		.back {
			font-size: 1rem;
			padding: 1rem;

			transform: rotateY(180deg);
			background-color: var(--color-accent-purple);

			.flip {
				font-size: 1rem;
				position: absolute;
				bottom: 0.5rem;
				left: 0.5rem;
			}

			:global(p) {
				margin: 0;
			}
		}
	}
</style>
