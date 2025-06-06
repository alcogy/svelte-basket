import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import QuantityButton from '$lib/ui/QuantityButton.svelte';
import { getBasketCount } from '$lib/state.svelte.js';

describe('QuantityButton.svelte', () => {
	const props = { item : { id: 1 }}

	test('should render button with initialize', () => {
		render(QuantityButton, { props: props });
		const div = document.querySelector('div.quantity');
		expect(div?.innerHTML).toBe('0');
		const addButton = screen.getByText('+');
		expect(addButton).not.toBeDisabled();
		const subButton = screen.getByText('-');
		expect(subButton).toBeDisabled();
	});

	test('Click buttons and update state', async () => {
		const user = userEvent.setup();

		render(QuantityButton, { props: props });
		const div = document.querySelector('div.quantity');
		expect(div?.innerHTML).toBe('0');
		const addButton = screen.getByText('+');
		await user.click(addButton);
		expect(div?.innerHTML).toBe('1');
		const subButton = screen.getByText('-');
		expect(subButton).not.toBeDisabled();
		await user.click(addButton);
		expect(div?.innerHTML).toBe('2');
		await user.click(subButton);
		expect(div?.innerHTML).toBe('1');
		await user.click(subButton);
		expect(div?.innerHTML).toBe('0');
		expect(subButton).toBeDisabled();
	});

	test('Upper Set quantity', async () => {
		const user = userEvent.setup();
		render(QuantityButton, { props: {
			item: {
				id: 1,
			},
			max: 5,
		} });
	})
	

});

