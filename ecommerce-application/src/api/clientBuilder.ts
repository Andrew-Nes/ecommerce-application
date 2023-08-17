import {
  ClientBuilder,
  AuthMiddlewareOptions,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  Client,
  AnonymousAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

const scopes = import.meta.env.VITE_CTP_SCOPES.split(' ');
const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: import.meta.env.VITE_CTP_AUTH_URL,
  projectKey,
  credentials: {
    clientId: import.meta.env.VITE_CTP_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
  },
  scopes,
  fetch,
};

const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
  host: import.meta.env.VITE_CTP_AUTH_URL,
  projectKey,
  credentials: {
    clientId: import.meta.env.VITE_CTP_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
  },
  scopes,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: import.meta.env.VITE_CTP_API_URL,
  fetch,
};

function getPasswordAuthMiddlewareOptions(
  username: string,
  password: string
): PasswordAuthMiddlewareOptions {
  return {
    host: import.meta.env.VITE_CTP_AUTH_URL,
    projectKey,
    credentials: {
      clientId: import.meta.env.VITE_CTP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
      user: {
        username,
        password,
      },
    },
    scopes,
    fetch,
  };
}

const clientObject = new ClientBuilder();

function getPasswordAuthClient(username: string, password: string): Client {
  return clientObject
    .withPasswordFlow(getPasswordAuthMiddlewareOptions(username, password))
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
}

function getAuthClient(): Client {
  return clientObject
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
}

function getAnonymousAuthClient(): Client {
  return clientObject
    .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
}

export {
  getAuthClient,
  getPasswordAuthClient,
  getAnonymousAuthClient,
  projectKey,
};
