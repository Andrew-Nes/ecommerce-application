import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { getPasswordAuthClient, projectKey } from './clientBuilder';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

// function createAnonymousClient() {
//   const client = getAnonymousAuthClient();
//   const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
//     projectKey,
//   });
//   return apiRoot;
// };

function createClientWithPassword(username: string, password: string) {
  const client = getPasswordAuthClient(username, password);
  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey,
  });
  return apiRoot;
}

// const anonymousClient = createAnonymousClient();
let client: ByProjectKeyRequestBuilder | undefined = undefined;

// export const loginClient2 = async (username: string, password: string) => {
//   try {
//     const response = await anonymousClient
//       .customers()
//       .get({
//         queryArgs: {
//           where: `email="${username}"`,
//         }
//       })
//       .execute()

//     if (response.body.results.length === 0) {
//       throw new Error('wrong email');
//     }
//     const clientId = response.body.results[0].id;
//     console.log('client', response.statusCode, response.body, clientId);

//     const login = await anonymousClient
//       .me()
//       .login()
//       .post({
//         body: {
//           email: username,
//           password: password,
//         },
//       })
//       .execute();

//     console.log('login', login);
//     return login;

//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(error.message)
//     }
//   }
// };

// export const loginClient1 = async (username: string, password: string) => {
//   const client = getPasswordAuthClient(username, password);
//   const apiRoot = createApiBuilderFromCtpClient(client);
//   return await apiRoot
//     .withProjectKey({ projectKey })
//     .me()
//     .login()
//     .post({
//       body: {
//         email: username,
//         password: password,
//       },
//     })
//     .execute();
// };

export const loginClient = async (username: string, password: string) => {
  try {
    if (!client) {
      client = createClientWithPassword(username, password);
    }
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
  } catch (error) {
    client = undefined;
    throw error;
  }
};

// export const anonymousToken = async () => {
//   const client = getAnonymousAuthClient();
//   const apiRoot = createApiBuilderFromCtpClient(client);
//   return await apiRoot
//     .withProjectKey({ projectKey })
//     .customers()
//     .get({
//       queryArgs: {
//         where: `email="harry@gmail.com"`
//       }
//     })
//     .execute();
// };
