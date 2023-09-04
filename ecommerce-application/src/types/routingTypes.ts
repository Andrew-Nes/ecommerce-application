export enum routes {
  MAIN = '/',
  LOGIN = '/login',
  REGISTER = '/register',
  PROFILE = '/profile',
  CATALOG = '/catalog',
  NOTFOUND = '*',
  SEARCH = '/catalog/search',
}

export interface buttonProps {
  text: string;
  route: string;
  className?: string;
}
export interface iconProps {
  src: string;
  route: string;
  className?: string;
  alt: string;
}
export interface loginStateChangeProp {
  loginStateChange: (newValue: boolean) => void;
}
