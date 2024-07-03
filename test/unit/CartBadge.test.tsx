import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { initStore } from '../../src/client/store';
import { MOCK_PRODUCT_1, TestApi, TestCartApi } from './utils';
import { CartBadge } from '../../src/client/components/CartBadge';

describe('<CartBadge />', () => {
    const basename = '/';

    const api = new TestApi(basename);
    const cart = new TestCartApi();
    const store = initStore(api as any, cart);
    
    const application = (
        <MemoryRouter initialEntries={['/catalog']} initialIndex={0}>
            <Provider store={store}>
                <CartBadge id={MOCK_PRODUCT_1.id} />
            </Provider>
        </MemoryRouter>
    );

    it('renders when item in a cart', async () => {
        const { container } = render(application);

        const badge = container.querySelector('.CartBadge');

        expect(badge).toBeVisible();
    });

    it('does not render when no item in a cart', async () => {
        const store = initStore(api as any, new TestCartApi({}));
        
        const application = (
            <MemoryRouter initialEntries={['/catalog']} initialIndex={0}>
                <Provider store={store}>
                    <CartBadge id={MOCK_PRODUCT_1.id} />
                </Provider>
            </MemoryRouter>
        );

        const { container } = render(application);

        const badge = container.querySelector('.CartBadge');

        expect(badge).not.toBeInTheDocument();
    });
});
