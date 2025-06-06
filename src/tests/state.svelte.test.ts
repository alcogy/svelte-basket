import { describe, test, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import type { Basket } from '$lib/state.svelte.js';
import {
	addBasket,
	removeBasket,
	updateBasket,
	fetchAllBaskets,
	getBasketCount,
	clearBasket,
	includeItem
} from '$lib/state.svelte.js';

describe('State control functions', () => {
	const item = { id: 1 };
	const item2 = { id: 2 };

	beforeEach(() => {
		clearBasket();
	})
	test('addBasket', () => {
		const basket1 = addBasket(item);
		const count = getBasketCount();
		expect(count).toBe(1);
		expect(basket1).not.toBe(undefined);

		const basket2 = addBasket(item);
		const count2 = getBasketCount();
		expect(count2).toBe(1);
		expect(basket2).toBe(undefined);

		addBasket(item2);
		const count3 = getBasketCount();
		expect(count3).toBe(2);
	});

	test('removeBasket', () => {
		const basket = addBasket(item) as Basket;
		const count = getBasketCount();
		expect(count).toBe(1);
		
		removeBasket(basket);

		const count2 = getBasketCount();
		expect(count2).toBe(0);
	});

	test('updateBasket', () => {
		const basket = addBasket(item) as Basket;
		const count = getBasketCount();
		expect(count).toBe(1);
		expect(includeItem(item)).toBe(true);
		
		basket.item = item2;
		updateBasket(basket);

		expect(count).toBe(1);
		expect(includeItem(item)).toBe(false);
		expect(includeItem(item2)).toBe(true);
	});

	test('fetchAllBaskets', () => {
		const baskets1 = fetchAllBaskets();
		expect(baskets1.length).toBe(0);

		addBasket(item);
		addBasket(item2);

		const baskets2 = fetchAllBaskets();
		expect(baskets2.length).toBe(2);
	});
});
