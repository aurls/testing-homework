import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import events from '@testing-library/user-event';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Application } from '../../src/client/Application';
import { initStore } from '../../src/client/store';
import { CartApi, ExampleApi } from '../../src/client/api';

describe('header', () => {
    const basename = '/';

    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);
    
    const application = (
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
    );

    it('renders logo as a link', async () => {
        const { container } = render(application);

        const logo = container.querySelector('.Application-Brand');

        expect(logo).toHaveAttribute('href', '/');
    });

    it('renders menu items properly', async () => {
        const { container } = render(application);

        const items = container.querySelectorAll('.nav-link');

        const labels = Array.from(items).map((item) => item.textContent);
        const links = Array.from(items).map((item) => item.getAttribute('href'));

        expect(labels).toStrictEqual(['Catalog', 'Delivery', 'Contacts', 'Cart']);
        expect(links).toStrictEqual(['/catalog', '/delivery', '/contacts', '/cart']);
    });

    it('hides menu on menu item click', async () => {
        const { container } = render(application);

        const hamburger = container.querySelector('.Application-Toggler') as HTMLElement;
        const firstItem = container.querySelector('.nav-link') as HTMLElement;
        const menu = container.querySelector('.Application-Menu') as HTMLDivElement;

        await events.click(hamburger);

        expect(menu).not.toHaveClass('collapse');

        await events.click(firstItem);

        expect(menu).toHaveClass('collapse');
    });
});
