import {
  createApiBuilderFromCtpClient,
  CustomerDraft,
} from '@commercetools/platform-sdk';
import {
  getPasswordAuthClient,
  projectKey,
  getAuthClient,
} from './clientBuilder';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

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

export const loginClient = async (username: string, password: string) => {
  const client = createClientPasswordFlow(username, password);
  await client
    .me()
    .login()
    .post({
      body: {
        email: username,
        password: password,
      },
    })
    .execute();
};

function createClientCredentialFlow(): ByProjectKeyRequestBuilder {
  const client = getAuthClient();
  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey,
  });
  return apiRoot;
}

export const CreateCustomer = async (data: CustomerDraft) => {
  const client = createClientCredentialFlow();
  await client
    .customers()
    .post({
      body: data,
    })
    .execute();
};

export const getProduct = async (ID: string) => {
  const client = createClientCredentialFlow();
  const product = await client
    .productProjections()
    .withId({ ID })
    .get()
    .execute();
  return product;
};
