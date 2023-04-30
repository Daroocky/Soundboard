<script lang="ts">
  import { Howl } from "howler";

  const sound = new Howl({
    src: ['src/assets/sound.mp3']
  });

  sound.on("play", (e) => {
    console.log(e);
    seek();
  });

  const seek = () => {
    count = sound.seek() / sound.duration() * 100;

    if(sound.playing()) {
      requestAnimationFrame(seek);
    }
  }


  let count: number = 0
  const increment = () => {
    if(sound.playing()) {
      sound.fade(1, 0, 1000)
    } else {
      sound.play();
    }
  }
</script>

<button on:click={increment} style:--test={count+"%"}>
  Play
</button>

<style>
  button {
    background: linear-gradient(90deg, #f1f1f1 var(--test, 0%), #f9f9f9 var(--test, 0%));
  }
</style>
