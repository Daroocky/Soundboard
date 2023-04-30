<script lang="ts">
	export let title = "";
</script>

<section>
	{#if title}
		<h2>{title}</h2>
	{/if}

	<div>
		<slot></slot>
	</div>
</section>

<style>
  section {
    padding: 1rem;
    border-bottom: 1px solid var(--color-gray-500);
  }

  h2 {
    font-size: 1rem;
    font-weight: var(--weight-bold);
    margin: 0 0 1rem;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>
