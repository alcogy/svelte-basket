import { v4 as uuidV4 } from "uuid";

const lsKey = 'svelte-basket';

/**
 * Base type for item.
 */
export interface Item {
	id: number | string;
}

/**
 * Base type for basket.
 */
export interface Basket {
	id: string;
	item: Item;
	quantity: number;
}

/**
 * Global state.
 */
interface State {
	baskets: Basket[],
}

/**
 * State management for Basket.
 */
const state = $state<State>({
	baskets: initialize(),
});

/**
 * Initialize Basket state.
 * @returns Basket data from localstorage.
 */
function initialize(): Basket[] {
	if (typeof window !== 'undefined') {
		return JSON.parse(localStorage.getItem(lsKey) as string) || [];
	}
	return [];
}

/**
 * Set basket state to Localstorage.
 */
function save() {
	if (typeof window !== 'undefined') {
		localStorage.setItem(lsKey, JSON.stringify(state.baskets));
	}
}

/**
 * The item to basket.
 * @param item item data
 * @param quantity quantity item
 * @returns new basket
 */
export function addBasket<T extends Item>(item: T, quantity?: number) {
	if (includeItem(item)) return;
	
	const basket: Basket = {
		id: uuidV4(),
		quantity: quantity ?? 1,
		item: item,
	}
	state.baskets.push(basket);
	save();

	return basket;
}

/**
 * Update a basket data.
 * @param basket target the basket.
 */
export function updateBasket(basket: Basket) {
	const index = state.baskets.findIndex((v) => v.id === basket.id);
	if (index === -1) return;
	state.baskets[index] = basket;
	save();
}

/**
 * Remove the basket data.
 * @param basket target the remove.
 */
export function removeBasket(basket: Basket) {
	state.baskets = state.baskets.filter((v) => v.id !== basket.id);
	save();
}

/**
 * Retrieve all basket data.
 * @returns Current basket data.
 */
export function fetchAllBaskets(): Basket[] {
	return state.baskets;
}

export function findBasketById(id: string): Basket | undefined {
	return state.baskets.find((v) => v.id === id);
}

export function findBasketByItem<T extends Item>(item: T): Basket | undefined {
	return state.baskets.find((v) => v.item.id === item.id);
}

/**
 * Retrieve basket data count.
 * @returns Current basket data count.
 */
export function getBasketCount(): number {
	return state.baskets.length;
}

/**
 * Clear all items.
 */
export function clearBasket() {
	state.baskets = [];
	save();
}

/**
 * Confirm that the item in basket
 * @param item Target item.
 * @returns Result that include or not the item.
 */
export function includeItem<T extends Item>(item: T): boolean {
	return state.baskets.map((v) => v.item.id).includes(item.id);
}
