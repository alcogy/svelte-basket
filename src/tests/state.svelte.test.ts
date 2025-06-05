import { describe, test, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { addBasket, removeBasket, updateBasket, fetchAllBaskets, getBasketCount, clearBasket, includeItem } from '$lib/state.svelte.js';

describe('State control functions', () => {
	const item = { id: 1 };
	const item2 = { id: 2 };

	beforeEach(() => {
		clearBasket();
	})
	test('addBasket', () => {
		addBasket(item);
		const count = getBasketCount();
		expect(count).toBe(1);

		addBasket(item);
		const count2 = getBasketCount();
		expect(count2).toBe(1);

		addBasket(item2);
		const count3 = getBasketCount();
		expect(count3).toBe(2);
	});

	test('removeBasket', () => {
		addBasket(item);
		const count = getBasketCount();
		expect(count).toBe(1);

		const baskets = fetchAllBaskets();
		removeBasket(baskets[0]);

		const count2 = getBasketCount();
		expect(count2).toBe(0);
	});

	test('updateBasket', () => {
		addBasket(item);
		const count = getBasketCount();
		expect(count).toBe(1);
		expect(includeItem(item)).toBe(true);
		
		const baskets = fetchAllBaskets();
		baskets[0].item = item2;
		updateBasket(baskets[0]);

		expect(count).toBe(1);
		expect(includeItem(item)).toBe(false);
		expect(includeItem(item2)).toBe(true);

	});
});
