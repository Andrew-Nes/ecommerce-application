export enum routes {
  MAIN = '/',
  LOGIN = '/login',
  REGISTER = '/register',
  NOTFOUND = '*',
}

export interface buttonProps {
  text: string;
  route: string;
  className?: string;
}

export interface loginStateChangeProp {
  loginStateChange: (newValue: boolean) => void;
}
