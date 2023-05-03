<script lang="ts">
	import Group from "../../ui/Group.svelte";
	import Sound from "../../ui/Sound.svelte";

	export let groups;

</script>

<div>
	{#each groups as group(group.id)}
		<Group title={group.title}>

			{#each group.sounds as sound(sound.id)}
				<Sound
				 color={sound.color}
				 id={sound.id}
				 loop={sound.loop}
				 title={sound.title}
				 blob={sound.file.blob}
				 solo={sound.solo}
				 pausable={sound.pausable}
				/>

			{/each}
		</Group>
	{/each}
</div>


<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
