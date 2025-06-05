import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import BasketButton from '$lib/ui/BasketButton.svelte';
import { getBasketCount } from '$lib/state.svelte.js';

describe('BasketButton.svelte', () => {
	const item = { id: 1 }
	test('should render button with initialize', () => {
		render(BasketButton, { props: { item: item }});
		const button = screen.getByRole('button');
		expect(button).toHaveTextContent('Add to basket');
		expect(button).not.toBeDisabled();
	});

	test('Pass the props', () => {
		const label = 'Into the cart!';
		render(BasketButton, {
			props: {
				item: item,
				label: label,
				disabled: true,
			}
		});
		const button = screen.getByRole('button');
		expect(button).not.toHaveTextContent('Add to basket');
		expect(button).toHaveTextContent(label);
		expect(button).toBeDisabled();
	});

	test('Action and state update', async () => {
		render(BasketButton, { props: { item: item }});
		const button = screen.getByRole('button');
		const user = userEvent.setup();
		// Click event at first time.
		await user.click(button);
		const count = getBasketCount();
		expect(count).toBe(1);
		expect(button).toBeDisabled();

		// Click again but count is one because the button is disabled.
		await user.click(button);
		const count2 = getBasketCount();
		expect(count2).toBe(1);
	});

});

