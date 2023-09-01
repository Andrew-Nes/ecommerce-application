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
        priceCurrency: 'USD',
        priceCountry: 'US',
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
  filters?: filtersCheckboxes
) => {
  const filtersString: string[] = [];
  const prices: filtersCheckboxes = {};
  if (filters) {
    for (const key of Object.keys(filters)) {
      if (key === 'price') {
        prices[key] = filters[key];
        continue;
      }
      if (filters[key] && filters[key].length > 0) {
        const value = filters[key].map((value) => `"${value}"`).join(',');
        const string = `variants.attributes.${key}:${value}`;
        filtersString.push(string);
      }
    }
  }

  const priceRange: number[] = [];
  if (prices.price && prices.price.length > 0) {
    const array = prices.price
      .map((value) => value.split(' - '))
      .flat()
      .map((value) => Number(value));
    priceRange.push(array[0], array[array.length - 1]);
  }
  const priceString =
    priceRange.length > 0
      ? `variants.price.centAmount:range (${priceRange[0] * 100} to ${
          priceRange[1] * 100
        })`
      : 'variants.prices:exists';

  const client = getCurrentClient();
  return await client
    .productProjections()
    .search()
    .get({
      queryArgs: {
        priceCurrency: 'USD',
        priceCountry: 'US',
        filter: [`categories.id:"${id}"`, ...filtersString, priceString],
        limit: 100,
        sort: `${sort}`,
      },
    })
    .execute();
};

interface filtersCheckboxes {
  [key: string]: string[];
}

// const val = await client
//     .productProjections()
//     .search()
//     .get({
//       queryArgs: {
//         // filter: [`categories.id:"${id}"`],
//         // limit: 20,
//         // priceCurrency: 'USD',
//         facet: ['variants.attributes.age'],
//         // 'variants.attributes.age'
//       }
//     })
//     .execute()
// console.log('VAL', val)
