enum buttonsText {
  LOGIN = 'login',
  LOGOUT = 'logout',
  SIGNUP = 'sign up',
  REGISTER = 'register',
  ADD_TO_CART = 'add to cart',
  REMOVE_FROM_CART = 'remove from cart',
  REMOVE_CART = 'remove cart',
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
  ABOUT = 'About us',
  CART = 'Cart',
  TO_CATALOG = 'To catalog page!',
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
  NOT_FOUND_PRODUCT_HEADING = 'What a Cat-astrophe!',
  ABOUT_PAGE_HEADING = 'Meet our developers!',
}

enum paragraphText {
  MAIN_PAGE_PARAGRAPH = 'If you want to sign up or login just click one of the buttons below:',
  LOGIN_PAGE_PARAGRAPH = 'Not registered? ',
  REGISTRATION_PAGE_PARAGRAPH = 'Already registered? ',
  NOT_FOUND_PAGE_PARAGRAPH_1 = "We can't find the page you're looking for.",
  NOT_FOUND_PRODUCT_PARAGRAPH = "We looked everywhere and we couldn't find products matching the selection..",
}

enum popupText {
  REGISTRATION_SUCCESS = 'Registration completed successfully! You are logged in.',
  REGISTRATION_FAIL = 'This email address already exists in the system. Log in or use another email address.',
  LOGIN_SUCCESS = 'Login completed successfully!',
  CHANGE_PASSWORD_SUCCESS = 'Your password has been changed!',
  CHANGE_PASSWORD_FAILED = 'Failed to change password! Something happened!',
  ADD_ADDRESS_SUCCESS = 'A new address has been added!',
  ADD_ADDRESS_FAILED = 'Failed to add address!',
  EDIT_PROFILE_SUCCESS = 'Profile has been updated',
  EDIT_PROFILE_FAILED = 'Failed to update profile!',
  EDIT_ADDRESS_SUCCESS = 'The address has been updated!',
  EDIT_ADDRESS_FAILED = 'Failed to update address!',
  DELETE_ADDRESS_SUCCESS = 'The address has been deleted',
  DELETE_ADDRESS_FAILED = 'Failed to delete address!',
}

export {
  buttonsText,
  anchorsText,
  logoText,
  headingText,
  paragraphText,
  popupText,
};
