enum buttonsText {
  LOGIN = 'login',
  LOGOUT = 'logout',
  SIGNUP = 'sign up',
  REGISTER = 'register',
}

enum anchorsText {
  MAIN = 'Main',
  LOGIN = 'Login',
  LOGOUT = 'Logout',
  SIGNUP = 'Sign up',
  CATALOG = 'Catalog',
  CREATE_NEW_ACCOUNT = 'Create your account',
  LOGIN_CLICK = 'Click to login',
  NOT_FOUND_CLICK = 'Go back to main',
  PROFILE = 'Profile',
}

enum logoText {
  LOGO = 'pets shop',
}

enum headingText {
  MAIN_PAGE_HEADING = 'Hello! You are on the main page of our incredible pets shop!',
  LOGIN_PAGE_HEADING = 'Account Login',
  REGISTRATION_PAGE_HEADING = 'Registration Form',
  CUSTOMER_FORM = 'Customer',
  SHIPPING_ADDRESS_FORM = 'Shipping address',
  BILLING_ADDRESS_FORM = 'Billing address',
  NOT_FOUND_PAGE_HEADING = 'Oops! Something went wrong',
}

enum paragraphText {
  MAIN_PAGE_PARAGRAPH = 'If you want to sign up or login just click one of the buttons below:',
  LOGIN_PAGE_PARAGRAPH = 'Not registered? ',
  REGISTRATION_PAGE_PARAGRAPH = 'Already registered? ',
  NOT_FOUND_PAGE_PARAGRAPH_1 = "We can't find the page you're looking for.",
}

enum popupText {
  REGISTRATION_SUCCESS = 'Registration completed successfully! You are logged in.',
  REGISTRATION_FAIL = 'This email address already exists in the system. Log in or use another email address.',
  LOGIN_SUCCESS = 'Login completed successfully!',
}

export {
  buttonsText,
  anchorsText,
  logoText,
  headingText,
  paragraphText,
  popupText,
};
