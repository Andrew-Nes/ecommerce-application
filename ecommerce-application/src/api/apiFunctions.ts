import {
  createApiBuilderFromCtpClient,
  CustomerDraft,
} from '@commercetools/platform-sdk';
import {
  getPasswordAuthClient,
  projectKey,
  // getAuthClient,
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
          // fuzzy: true,
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
