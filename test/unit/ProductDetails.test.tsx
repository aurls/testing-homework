import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { initStore } from '../../src/client/store';
import { MOCK_PRODUCT_1, TestApi, TestCartApi } from './utils';
import { ProductDetails } from '../../src/client/components/ProductDetails';

describe('<ProductDetails />', () => {
    const basename = '/';

    const store = initStore(new TestApi(basename) as any, new TestCartApi());

    const application = (
        <MemoryRouter initialEntries={['/catalog/1']} initialIndex={0}>
            <Provider store={store}>
                <ProductDetails product={MOCK_PRODUCT_1} />
            </Provider>
        </MemoryRouter>
    );

    it('renders properly', () => {
        const { container } = render(application);

        const image = container.querySelector('.Image');
        const title = container.querySelector('.ProductDetails-Name')?.textContent;
        const description = container.querySelector('.ProductDetails-Description')?.textContent;
        const price = container.querySelector('.ProductDetails-Price')?.textContent;
        const color = container.querySelector('.ProductDetails-Color')?.textContent;
        const material = container.querySelector('.ProductDetails-Material')?.textContent;
        const addToCart = container.querySelector('.ProductDetails-AddToCart');

        expect(image).toBeVisible();
        expect(title).toBe(MOCK_PRODUCT_1.name);
        expect(description).toBe(MOCK_PRODUCT_1.description);
        expect(price).toBe(`$${MOCK_PRODUCT_1.price}`);
        expect(color).toBe(MOCK_PRODUCT_1.color);
        expect(material).toBe(MOCK_PRODUCT_1.material);
        expect(addToCart).toBeVisible();
        expect(addToCart).toHaveClass('btn-lg');
    });
});
