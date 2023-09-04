import {
  createApiBuilderFromCtpClient,
  CustomerDraft,
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

export const getProduct = async (ID: string) => {
  const client = getCurrentClient();
  const product = await client
    .productProjections()
    .withId({ ID })
    .get()
    .execute();
  return product;
};
