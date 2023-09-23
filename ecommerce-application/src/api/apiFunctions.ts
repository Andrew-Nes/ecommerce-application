import {
  CartResourceIdentifier,
  createApiBuilderFromCtpClient,
  CustomerChangePassword,
  CustomerDraft,
  MyCartDraft,
  MyCartUpdate,
  MyCartUpdateAction,
  MyCustomerUpdate,
} from '@commercetools/platform-sdk';
import {
  getPasswordAuthClient,
  projectKey,
  getClientWithExistingToken,
  getAnonymousAuthClient,
} from './clientBuilder';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import tokenStorage from './tokenStorage';
import { PriceCountry, PriceCurrency } from '../types/commonDataTypes';
import { filtersCheckboxes } from '../types/categoryTypes';
import { getFiltersString, getPriceFilterString } from '../utils/apiHelpers';

let loggedClient: ByProjectKeyRequestBuilder | undefined = undefined;

function createClientPasswordFlow(
  username: string,
  password: string
): ByProjectKeyRequestBuilder {
  const client = getPasswordAuthClient(username, password);
  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey,
  });
  return apiRoot;
}

function createAnonymousFlow() {
  const client = getAnonymousAuthClient();
  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey,
  });
  return apiRoot;
}

function createClientWithExistingToken(
  token: string
): ByProjectKeyRequestBuilder {
  const client = getClientWithExistingToken(token);
  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey,
  });
  return apiRoot;
}

function getCurrentClient() {
  if (loggedClient) {
    return loggedClient;
  }
  const token = window.localStorage.getItem('token');
  if (token) {
    return createClientWithExistingToken(token);
  }
  return createAnonymousFlow();
}

export const loginClient = async (username: string, password: string) => {
  const anonCart: CartResourceIdentifier = {
    typeId: 'cart',
    id: window.localStorage.getItem('cartId') || '',
  };
  try {
    const response = await getCurrentClient()
      .login()
      .post({
        body: {
          email: username,
          password: password,
          anonymousCart: anonCart,
          anonymousCartSignInMode: 'MergeWithExistingCustomerCart',
          updateProductData: true,
        },
      })
      .execute();
    tokenStorage.clear();
    const cartId = response.body.cart?.id || '';
    window.localStorage.setItem('cartId', cartId);
    loggedClient = createClientPasswordFlow(username, password);
  } catch (error) {
    loggedClient = undefined;
    throw error;
  }
};

export const CreateCustomer = async (data: CustomerDraft) => {
  const client = getCurrentClient();
  await client
    .customers()
    .post({
      body: data,
    })
    .execute();
};

export const getCategories = async () => {
  const client = getCurrentClient();
  return await client.categories().get().execute();
};

export const GetCustomer = async () => {
  const client = getCurrentClient();
  return await client.me().get().execute();
};

export const UpdateCustomer = async (updateCustomer: MyCustomerUpdate) => {
  const client = getCurrentClient();
  return await client
    .me()
    .post({
      body: updateCustomer,
    })
    .execute();
};

export const UpdateCustomerPassword = async (
  updateCustomer: CustomerChangePassword
) => {
  const client = getCurrentClient();
  return await client
    .me()
    .password()
    .post({
      body: updateCustomer,
    })
    .execute();
};

export const getItems = async (id: string = '', sort: string) => {
  const client = getCurrentClient();
  return await client
    .productProjections()
    .search()
    .get({
      queryArgs: {
        priceCurrency: PriceCurrency.DOLLAR,
        priceCountry: PriceCountry.USA,
        filter: `categories.id:"${id}"`,
        limit: 100,
        sort: `${sort}`,
      },
    })
    .execute();
};

export const getFilteredItems = async (
  id: string = '',
  sort: string,
  text: string,
  offset: number,
  filters?: filtersCheckboxes
) => {
  const filtersString: string[] = getFiltersString(filters);
  const priceString = getPriceFilterString(filters);
  const query =
    text.length > 0
      ? {
          priceCurrency: PriceCurrency.DOLLAR,
          priceCountry: PriceCountry.USA,
          filter: [`categories.id:"${id}"`, ...filtersString, priceString],
          limit: 6,
          offset,
          sort: `${sort}`,
          ['text.en-US']: `"${text}"`,
        }
      : {
          priceCurrency: PriceCurrency.DOLLAR,
          priceCountry: PriceCountry.USA,
          filter: [`categories.id:"${id}"`, ...filtersString, priceString],
          limit: 6,
          offset,
          sort: `${sort}`,
        };

  const client = getCurrentClient();
  return await client
    .productProjections()
    .search()
    .get({
      queryArgs: query,
    })
    .execute();
};

export const getProduct = async (ID: string) => {
  const client = getCurrentClient();
  const product = await client
    .productProjections()
    .withId({ ID })
    .get()
    .execute();
  return product;
};

export const CreateCart = async () => {
  const cartDraft: MyCartDraft = {
    currency: 'USD',
    country: 'US',
  };
  if (window.localStorage.getItem('isLoggedIn') !== 'true') {
    loggedClient = undefined;
  }
  const client = getCurrentClient();
  const cart = await client.me().carts().post({ body: cartDraft }).execute();
  return cart;
};

export const GetActiveCart = async () => {
  const client = getCurrentClient();
  return await client.me().activeCart().get().execute();
};

export const RemoveCart = async () => {
  const activeCart = await GetActiveCart();
  const activeCartVersion = activeCart.body.version;
  const activeCartId = activeCart.body.id;
  const client = getCurrentClient();
  return await client
    .me()
    .carts()
    .withId({ ID: activeCartId })
    .delete({ queryArgs: { version: activeCartVersion } })
    .execute();
};

export const AddProductToCart = async (productId: string) => {
  const activeCart = await GetActiveCart();
  const activeCartVersion = activeCart.body.version;
  const activeCartId = activeCart.body.id;

  const cartUpdate: MyCartUpdate = {
    version: activeCartVersion,
    actions: [
      {
        action: 'addLineItem',
        productId: productId,
      },
    ],
  };
  const client = getCurrentClient();
  await client
    .me()
    .carts()
    .withId({ ID: activeCartId })
    .post({
      body: cartUpdate,
    })
    .execute();
};

export const CartUpdateFunction = async (updateAction: MyCartUpdateAction) => {
  const activeCart = await GetActiveCart();
  const activeCartVersion = activeCart.body.version;
  const activeCartId = activeCart.body.id;
  const cartUpdate: MyCartUpdate = {
    version: activeCartVersion,
    actions: [updateAction],
  };
  const client = getCurrentClient();
  return await client
    .me()
    .carts()
    .withId({ ID: activeCartId })
    .post({
      body: cartUpdate,
    })
    .execute();
};

export const GetDiscount = async () => {
  const client = getCurrentClient();
  return await client.discountCodes().get().execute();
};
