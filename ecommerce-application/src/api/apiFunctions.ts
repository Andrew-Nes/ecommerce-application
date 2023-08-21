import {
  createApiBuilderFromCtpClient,
  CustomerDraft,
} from '@commercetools/platform-sdk';
import {
  getPasswordAuthClient,
  projectKey,
  getAuthClient,
} from './clientBuilder';

function createClientPasswordFlow(username: string, password: string) {
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

function createClientCredentialFlow() {
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
