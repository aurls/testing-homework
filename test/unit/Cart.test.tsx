import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import events from '@testing-library/user-event';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { initStore } from '../../src/client/store';
import { MOCK_CART_STATE, MOCK_PRODUCT_1, MOCK_PRODUCT_2, TestApi, TestCartApi } from './utils';
import { Cart } from '../../src/client/pages/Cart';

describe('<Cart />', () => {
    const basename = '/';

    const api = new TestApi(basename);
    const cart = new TestCartApi();
    const store = initStore(api as any, cart);
    
    const application = (
        <MemoryRouter initialEntries={['/cart']} initialIndex={0}>
            <Provider store={store}>
                <Cart />
            </Provider>
        </MemoryRouter>
    );

    it('renders cart items properly', () => {
        const { container } = render(application);

        const table = container.querySelector('.Cart-Table') as HTMLElement;
        const names = Array.from(table.querySelectorAll('.Cart-Name')).map((el) => el.textContent);
        const prices = Array.from(table.querySelectorAll('.Cart-Price')).map((el) => el.textContent);
        const counts = Array.from(table.querySelectorAll('.Cart-Count')).map((el) => el.textContent);
        const totals = Array.from(table.querySelectorAll('.Cart-Total')).map((el) => el.textContent);
        const orderPrice = table.querySelector('.Cart-OrderPrice')?.textContent;

        const total1 = MOCK_CART_STATE[MOCK_PRODUCT_1.id].count * MOCK_PRODUCT_1.price;
        const total2 = MOCK_CART_STATE[MOCK_PRODUCT_2.id].count * MOCK_PRODUCT_2.price;

        expect(names).toStrictEqual([MOCK_PRODUCT_1.name, MOCK_PRODUCT_2.name]);

        expect(prices).toStrictEqual([
            `$${MOCK_PRODUCT_1.price}`,
            `$${MOCK_PRODUCT_2.price}`
        ]);

        expect(counts).toStrictEqual([
            MOCK_CART_STATE[MOCK_PRODUCT_1.id].count.toString(),
            MOCK_CART_STATE[MOCK_PRODUCT_2.id].count.toString()
        ]);

        expect(totals).toStrictEqual([
            `$${total1}`,
            `$${total2}`
        ]);

        expect(orderPrice).toBe(`$${total1 + total2}`);
    });

    it('renders empty cart properly', async () => {        
        const { container } = render(
            <MemoryRouter initialEntries={['/cart']} initialIndex={0}>
                <Provider store={initStore(new TestApi(basename) as any, new TestCartApi({}))}>
                    <Cart />
                </Provider>
            </MemoryRouter>
        );

        const table = container.querySelector('.Cart-Table') as HTMLElement;
        const cart = container.querySelector('.Cart') as HTMLElement;
        const link = cart.querySelector('a');
        const clear = container.querySelector('.Cart-Clear');
        const form = container.querySelector('.Form');

        expect(table).not.toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/catalog');
        expect(clear).not.toBeInTheDocument();
        expect(form).not.toBeInTheDocument();
    });

    it('clears cart properly', async () => {
        const { container } = render(application);

        const table = container.querySelector('.Cart-Table') as HTMLElement;
        const clear = container.querySelector('.Cart-Clear') as HTMLButtonElement;

        await events.click(clear);

        expect(table).not.toBeInTheDocument();
    });
});
