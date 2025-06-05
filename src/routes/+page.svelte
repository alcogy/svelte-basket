<script lang="ts">
	import type { Item } from "$lib/state.svelte.js";
	import { fetchAllBaskets, clearBasket, removeBasket, getBasketCount } from "$lib/state.svelte.js";
	import BasketButton from "$lib/ui/BasketButton.svelte";

	interface Product extends Item {
		name: string;
		price: number;
	}
	const products: Product[] = [
		{ id: 1, name: 'Pencil', price: 300 },
		{ id: 2, name: 'Pen', price: 500 },
		{ id: 3, name: 'Eraser', price: 150 },
		{ id: 4, name: 'Notebook', price: 350 },
		{ id: 5, name: 'Tape', price: 400 },
	]

</script>

<h3>Product list</h3>
<ul>
{#each products as product }
	<li>{product.name} <BasketButton item={product} /></li>
{/each}
</ul>

<h3>In basket</h3>
<ul>
{#each fetchAllBaskets() as basket}
	<li>{(basket.item as Product).name} <button onclick={() => removeBasket(basket)}>Remove</button></li>
{/each}
</ul>
<p>Counts:{getBasketCount()}</p>

<div>
	<button onclick={() => clearBasket()}>Clear basket</button>
</div>