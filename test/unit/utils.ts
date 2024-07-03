import type { CartItem, CartState, CheckoutFormData, Product } from "../../src/common/types";

export const createMockProduct = (params: Partial<Product>): Product => ({
  id: 1,
  name: 'tablet',
  description: 'some caption',
  price: 1000,
  color: 'black',
  material: 'cotton',
  ...params
});

export const MOCK_PRODUCT_1 = createMockProduct({ id: 1 });
export const MOCK_PRODUCT_2 = createMockProduct({ id: 2 });

export const MOCK_PRODUCTS: Product[] = [
  MOCK_PRODUCT_1,
  MOCK_PRODUCT_2
];

export const MOCK_CART_ITEM_1: CartItem = {
  name: MOCK_PRODUCT_1.name,
  price: 1000,
  count: 1
};

export const MOCK_CART_ITEM_2: CartItem = {
  name: MOCK_PRODUCT_2.name,
  price: 1000,
  count: 4
};

export const MOCK_CART_STATE: CartState = {
  [MOCK_PRODUCT_1.id]: MOCK_CART_ITEM_1,
  [MOCK_PRODUCT_2.id]: MOCK_CART_ITEM_2
};

export const MOCK_CHECKOUT_FORM_DATA: CheckoutFormData = {
  name: 'name',
  phone: '1234567890',
  address: 'address'
};

export class TestApi {
  constructor(
    private basename: string,
    private readonly products: Product[] = MOCK_PRODUCTS
  ) {}

  async getProducts() {
      return Promise.resolve(this.products);
  }

  async getProductById(id: number) {
      return new Promise((res, rej) => {
        const product = this.products.find((p) => p.id === id);

        if (product) {
          res(product);
        } else {
          rej(product);
        }
      });
  }

  async checkout(form: CheckoutFormData, cart: CartState) {
      return Promise.resolve(0);
  }
}

export class TestCartApi {
  private state: CartState = {};

  constructor(state: CartState = MOCK_CART_STATE) {
    this.state = state;
  }

  getState(): CartState {
    return this.state;
  }

  setState(cart: CartState) {
    this.state = cart;
  }
}
