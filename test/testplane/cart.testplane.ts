describe('cart', () => {
    it('clears cart properly', async ({ browser }) => {
        await browser.url('http://localhost:3000/hw/store/catalog/0');

        const addToCart = await browser.$('.ProductDetails-AddToCart');
        await addToCart.click();

        await browser.url('http://localhost:3000/hw/store/cart');

        const clear = await browser.$('.Cart-Clear');
        await clear.click();

        await browser.$('body').assertView('plane');
    });

    it('submits an order', async ({ browser }) => {
        await browser.url('http://localhost:3000/hw/store/catalog/0');

        const addToCart = await browser.$('.ProductDetails-AddToCart');
        await addToCart.click();
        await addToCart.click();

        await browser.url('http://localhost:3000/hw/store/cart');

        const name = await browser.$('.Form-Field_type_name');
        const phone = await browser.$('.Form-Field_type_phone');
        const address = await browser.$('.Form-Field_type_address');
        const submit = await browser.$('.Form-Submit');

        await name.setValue('name');
        await phone.setValue('1234567890');
        await address.setValue('address');
        await submit.click();

        const successMessage = await browser.$('.Cart-SuccessMessage');

        await successMessage.waitForDisplayed();

        await browser.$('body').assertView('plane');
    });
});
