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
	id: number | string;
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
 */
export function addBasket(item: Item, quantity?: number) {
	if (includeItem(item)) return;
	
	const basket: Basket = {
		id: uuidV4(),
		quantity: quantity ?? 1,
		item: item,
	}
	state.baskets.push(basket);
	save();
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
export function includeItem(item: Item): boolean {
	return state.baskets.map((v) => v.item.id).includes(item.id);
}
