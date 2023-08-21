import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

export default class TokenStorage implements TokenCache {
  private tokenStore: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  };

  public get(): TokenStore {
    return this.tokenStore;
  }

  public set(cache: TokenStore): void {
    this.tokenStore = cache;
  }
}
