import {
  //CartDraft,
  CartResourceIdentifier,
  // CartUpdate,
  // CartUpdateAction,
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

/*export const loginClient = async (username: string, password: string) => {
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
};*/

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
    const anonymousId = response.body.cart?.anonymousId || '';
    window.localStorage.setItem('cartId', cartId);
    window.localStorage.setItem('anonymousId', anonymousId);
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

export const CreateCart = async () => {
  const cartDraft: MyCartDraft = {
    currency: 'USD',
    country: 'US',
  };
  loggedClient = undefined;
  const client = getCurrentClient();
  const cart = await client.me().carts().post({ body: cartDraft }).execute();
  return cart;
};

/*export const CreateMyCart = async (cartDraft: MyCartDraft) => {
  const client = getCurrentClient();
  const cart = await client.me().carts().post({ body: cartDraft }).execute();
  window.localStorage.setItem('cart', cart.body.id);
};*/

export const GetCart = async (cartId: string) => {
  const client = getCurrentClient();
  return await client.carts().withId({ ID: cartId }).get().execute();
};

/*export const GetCart = async () => {
  const client = getCurrentClient();
  return await client.me().carts().get().execute()
};*/

export const GetActiveCart = async () => {
  const client = getCurrentClient();
  return await client.me().activeCart().get().execute();
};

/*export const RemoveCart = async (cartId: string) => {
  const cartVersion = (await GetCart(cartId)).body.version;
  const client = getCurrentClient();
  return await client
    .carts()
    .withId({ ID: cartId })
    .delete({ queryArgs: { version: cartVersion } })
    .execute();
};
*/
export const RemoveCart = async (/*cartId: string*/) => {
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
export const AddProductToCart = async (
  /*cartId: string, */ productId: string
) => {
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

/*export const CartUpdateFunction = async (
  cartId: string,
  updateAction: CartUpdateAction
) => {
  const cartVersion = (await GetCart(cartId)).body.version;

  const cartUpdate: CartUpdate = {
    version: cartVersion,
    actions: [updateAction],
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
*/
export const CartUpdateFunction = async (
  //cartId: string,
  updateAction: MyCartUpdateAction
) => {
  const activeCart = await GetActiveCart();
  const activeCartVersion = activeCart.body.version;
  const activeCartId = activeCart.body.id;
  const cartUpdate: MyCartUpdate = {
    version: activeCartVersion,
    actions: [updateAction],
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

export const GetDiscount = async () => {
  const client = getCurrentClient();
  return await client.discountCodes().get().execute();
};
