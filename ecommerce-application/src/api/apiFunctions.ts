import {
  CartDraft,
  CartUpdate,
  createApiBuilderFromCtpClient,
  CustomerChangePassword,
  CustomerDraft,
  MyCartDraft,
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

// function createClientCredentialFlow(): ByProjectKeyRequestBuilder {
//   const client = getAuthClient();
//   const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
//     projectKey,
//   });
//   return apiRoot;
// }

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
  tokenStorage.clear();
  loggedClient = createClientPasswordFlow(username, password);
  try {
    await loggedClient
      .me()
      .login()
      .post({
        body: {
          email: username,
          password: password,
        },
      })
      .execute();
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
          limit: 100,
          sort: `${sort}`,
          ['text.en-US']: `"${text}"`,
        }
      : {
          priceCurrency: PriceCurrency.DOLLAR,
          priceCountry: PriceCountry.USA,
          filter: [`categories.id:"${id}"`, ...filtersString, priceString],
          limit: 100,
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

export const CreateCart = async (cartDraft: CartDraft) => {
  const client = getCurrentClient();
  const cart = await client.carts().post({ body: cartDraft }).execute();
  window.localStorage.setItem('cart', cart.body.id);
  return cart;
};

export const CreateMyCart = async (cartDraft: MyCartDraft) => {
  const client = getCurrentClient();
  const cart = await client.me().carts().post({ body: cartDraft }).execute();
  window.localStorage.setItem('cart', cart.body.id);
};

export const GetCart = async (cartId: string) => {
  const client = getCurrentClient();
  return await client.carts().withId({ ID: cartId }).get().execute();
};

export const AddProductToCart = async (cartId: string, productId: string) => {
  const cartVersion = (await GetCart(cartId)).body.version;

  const cartUpdate: CartUpdate = {
    version: cartVersion,
    actions: [
      {
        action: 'addLineItem',
        productId: productId,
      },
    ],
  };
  const client = getCurrentClient();
  await client
    .carts()
    .withId({ ID: cartId })
    .post({
      body: cartUpdate,
    })
    .execute();
};

export const RemoveProductToCart = async (
  cartId: string,
  lineItemId: string,
  quantity: number | undefined = undefined
) => {
  const cartVersion = (await GetCart(cartId)).body.version;

  const cartUpdate: CartUpdate = {
    version: cartVersion,
    actions: [
      {
        action: 'removeLineItem',
        lineItemId: lineItemId,
        quantity: quantity,
      },
    ],
  };
  const client = getCurrentClient();
  await client
    .carts()
    .withId({ ID: cartId })
    .post({
      body: cartUpdate,
    })
    .execute();
};
