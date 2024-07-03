describe('catalog', () => {
    it('renders items properly', async ({ browser }) => {
        await browser.url('http://localhost:3000/hw/store/catalog');

        const images = await browser.$$('.Image');
        const names = await browser.$$('.ProductItem-Name');
        const prices = await browser.$$('.ProductItem-Price');
        const links = await browser.$$('.ProductItem-DetailsLink');

        await Promise.all(images.map((image) => expect(image).toBeDisplayed()));
        await Promise.all(names.map((name) => expect(name).toBeDisplayed()));
        await Promise.all(prices.map((price) => expect(price).toBeDisplayed()));
        await Promise.all(links.map((link) => expect(link).toBeDisplayed()));
        await Promise.all(links.map((link) => expect(link.getAttribute('href')).not.toBeUndefined()));
    });

    it('add items to a cart', async ({ browser }) => {
        await browser.url('http://localhost:3000/hw/store/catalog');

        const detailsLink = await browser.$('.ProductItem-DetailsLink');
        await detailsLink.click();

        const addToCart = await browser.$('.ProductDetails-AddToCart');
        await addToCart.waitForDisplayed();
        await addToCart.click();
        await addToCart.click();

        await browser.url('http://localhost:3000/hw/store/cart');

        const cartInHeader = await browser.$('[href="/hw/store/cart"]');
        const table = await browser.$('.Cart-Table');
        
        expect(cartInHeader).toHaveText('Cart (1)');
        expect(table).toBeDisabled();
    });
});
