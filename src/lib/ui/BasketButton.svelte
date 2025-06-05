<script lang="ts">
	import { addBasket, includeItem } from "$lib/state.svelte.js";
	import type { Item } from "$lib/state.svelte.js";
	let {
		label = 'Add to basket',
		disabled = false,
		item
	} : {
		label?: string,
		disabled?: boolean,
		item: Item,
	} = $props();

	let isDisabled = $derived(disabled || includeItem(item));

	function onClickEvent() {
		isDisabled = true;
		addBasket(item);
	}
</script>

<button disabled={isDisabled} onclick={onClickEvent}>
	{label}
</button>

<style>
	button {
		border: 0;
		background-color: #ec5;
		border-radius: 9999px;
		padding: 4px 12px;
		font-weight: bold;
		cursor: pointer;
	}
	button:disabled {
		cursor: default;
		background-color: #999;
		color: #555;
	}
	button:hover:not(:disabled) {
		opacity: 0.8;
	}
</style>