import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

class TokenStorage implements TokenCache {
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
    window.localStorage.setItem('token', cache.token);
  }

  public clear(): void {
    this.tokenStore = {
      token: '',
      expirationTime: 0,
      refreshToken: '',
    };
  }
}

const tokenStorage = new TokenStorage();

export default tokenStorage;
