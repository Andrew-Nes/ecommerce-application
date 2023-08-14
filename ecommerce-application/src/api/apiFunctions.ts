import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { getPasswordAuthClient, projectKey } from './clientBuilder';

export const loginClient = async (username: string, password: string) => {
  const client = getPasswordAuthClient(username, password);
  const apiRoot = createApiBuilderFromCtpClient(client);
  return await apiRoot
    .withProjectKey({ projectKey })
    .login()
    .post({
      body: {
        email: username,
        password: password,
      },
    })
    .execute();
};
