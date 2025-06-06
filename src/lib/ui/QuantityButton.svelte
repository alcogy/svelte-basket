<script lang="ts">
	import { addBasket, removeBasket, findBasketByItem, updateBasket } from "$lib/state.svelte.js";
	import type { Item, Basket } from "$lib/state.svelte.js";

	let {
		max,
		disabled = false,
		item
	}: {
		disabled?: boolean,
		max?: number,
		item: Item,
	} = $props();

	let basket: Basket | undefined = $derived(findBasketByItem(item));
	let quantity: number = $derived(basket?.quantity || 0);
	let isDisabled: boolean = $derived(disabled);
	
	function onClickSubEvent() {
		if (basket === undefined) return;
		basket.quantity -= 1;
		if (basket.quantity === 0) {
			removeBasket(basket);
			basket = undefined;
		} else {
			updateBasket(basket);
		}
	}

	function onClickAddEvent() {
		if (basket === undefined) {
			basket = addBasket(item);
		} else {
			basket.quantity += 1;
			updateBasket(basket);
		}
	}

</script>

<div class="wrap">
	<button
		class="sub"
		disabled={isDisabled || quantity === 0}
		onclick={onClickSubEvent}
	>
		-
	</button>
	<div class="quantity">
		{quantity}
	</div>
	<button
		class="add"
		disabled={isDisabled || (max !== undefined && quantity >= max)}
		onclick={onClickAddEvent}
	>
		+
	</button>
</div>

<style>
	.wrap {
		display: flex;
		border: 1px solid #ccc;
		border-radius: 9999px;
	}
	button {
		border: 0;
		background-color: #ddd;
		padding: 4px 0;
		width: 24px;
		font-size: 0.9rem;
		font-weight: bold;
		cursor: pointer;
	}
	button:disabled {
		cursor: default;
		background-color: #aaa;
		color: #555;
	}
	button:hover:not(:disabled) {
		opacity: 0.8;
	}
	button.sub {
		border-radius: 99px 0 0 99px;
	}
	button.add {
		border-radius: 0 99px 99px 0;
	}
	div.quantity {
		background-color: #eee;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 8px;
	}
</style>