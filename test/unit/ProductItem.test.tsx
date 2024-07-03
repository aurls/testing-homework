import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { initStore } from '../../src/client/store';
import { MOCK_PRODUCT_1, TestApi, TestCartApi } from './utils';
import { ProductItem } from '../../src/client/components/ProductItem';

describe('<ProductItem />', () => {
    const basename = '/';

    const api = new TestApi(basename);
    const cart = new TestCartApi();
    const store = initStore(api as any, cart);
    
    const application = (
        <MemoryRouter initialEntries={['/catalog']} initialIndex={0}>
            <Provider store={store}>
                <ProductItem product={MOCK_PRODUCT_1} />
            </Provider>
        </MemoryRouter>
    );

    it('renders properly', () => {
        const { container } = render(application);

        const image = container.querySelector('.Image');
        const title = container.querySelector('.ProductItem-Name')?.textContent;
        const price = container.querySelector('.ProductItem-Price')?.textContent;
        const link = container.querySelector('.ProductItem-DetailsLink');

        expect(image).toBeVisible();
        expect(title).toBe(MOCK_PRODUCT_1.name);
        expect(price).toBe(`$${MOCK_PRODUCT_1.price}`);
        expect(link).toHaveAttribute('href', `/catalog/${MOCK_PRODUCT_1.id}`);
    });
});
