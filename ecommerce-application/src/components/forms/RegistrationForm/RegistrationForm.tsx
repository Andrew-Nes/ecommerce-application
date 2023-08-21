import './RegistrationForm.scss';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import type { RegistrationFormData } from '../../../types/registrationFormTypes';
import MyInput from './inputs/MyInput';
import { validateFields } from './validateFields';
import MyCountrySelect from './inputs/MyCountrySelect';
import MyCheckBox from './inputs/myCheckBox/MyCheckBox';
import MyPassInput from './inputs/MyPassInput';
import { CreateCustomer, loginClient } from '../../../api/apiFunctions';
import convertDataForm from '../../../types/registrationFormTypes';
import { ClientResponse, ErrorResponse } from '@commercetools/platform-sdk';
import { serviceErrors } from '../../../types/formTypes';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorsMessage } from '../../../types/formTypes';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../types/routes';
import { buttonsText, headingText } from '../../../types/elementsText';


const COUNTRIES: string[] = ['US'];
const defaultCountryIndex: number = 0;

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    getValues,
    setValue,
    trigger,
    setError,
  } = useForm<RegistrationFormData>({ mode: 'onTouched' });

  const [isSetSameAddress, setSameAddress] = useState(false);

  const redirect = useNavigate();

  const onSubmit: SubmitHandler<RegistrationFormData> = async (
    data: RegistrationFormData
  ) => {
    try {
      await CreateCustomer(convertDataForm(data, isSetSameAddress));
      await loginClient(data.email, data.password);
      reset();
      redirect(routes.MAIN);
      toast.success('Registration completed successfully! You Log In.', {
        position: 'bottom-center',
      });
    } catch (error) {
      const errorResponse = JSON.parse(
        JSON.stringify(error)
      ) as ClientResponse<ErrorResponse>;

      const errorCode = errorResponse.body.statusCode;
      const errorMessage = errorResponse.body.message;

      if (errorMessage === serviceErrors.DUPLICATE_FIELD) {
        setError('email', {
          type: 'existEmail',
          message: errorsMessage.EXIST_EMAIL,
        });
        toast.error(errorsMessage.TOAST_EMAIL_EXIST, {
          position: 'bottom-center',
        });
      } else if (
        errorCode === serviceErrors.INVALID_CUSTOMER_CREDENTIALS &&
        errorMessage !== serviceErrors.DUPLICATE_FIELD
      ) {
        toast.error(errorsMessage.TOAST_INVALID_INPUT, {
          position: 'bottom-center',
        });
      }
      if (
        errorCode === serviceErrors.SERVICE_UNAVAILABLE ||
        errorCode === serviceErrors.BAD_GATEWAY ||
        errorCode === serviceErrors.INTERNAL_SERVER_ERROR
      ) {
        toast.info(errorsMessage.TOAST_SERVER_ERROR, {
          position: 'bottom-center',
        });
      }
    }
  };

  function setBillingAddress() {
    if (!isSetSameAddress) {
      setValue('cityBilling', getValues('cityShipping'));
      setValue('streetBilling', getValues('streetShipping'));
      setValue('postalCodeBilling', getValues('postalCodeShipping'));
      setValue('countryBilling', getValues('countryShipping'));
      trigger([
        'cityBilling',
        'streetBilling',
        'postalCodeBilling',
        'countryBilling',
      ]);
      setSameAddress(true);
    } else {
      setValue('cityBilling', '');
      setValue('streetBilling', '');
      setValue('postalCodeBilling', '');
      setValue('countryBilling', COUNTRIES[defaultCountryIndex]);
      trigger([
        'cityBilling',
        'streetBilling',
        'postalCodeBilling',
        'countryBilling',
      ]);
      setSameAddress(false);
    }
  }

  return (
    <div className="registration">
      <h3 className="heading registration__heading">
        {headingText.REGISTRATION_PAGE_HEADING}
      </h3>
      <form className="registration__form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="registration__form__fieldset fieldset">
          <legend className="fieldset__heading">
            {headingText.CUSTOMER_FORM}
          </legend>
          <MyInput
            register={register}
            errors={errors}
            name="email"
            title="Email"
            validate={validateFields.EMAIL_VALIDATE}
          />

          <MyPassInput
            register={register}
            errors={errors}
            name="password"
            title="Password"
            validate={validateFields.PASSWORD_VALIDATE}
          />
          <MyInput
            register={register}
            errors={errors}
            name="firstName"
            title="First Name"
            validate={validateFields.FIRST_NAME_VALIDATE}
          />
          <MyInput
            register={register}
            errors={errors}
            name="lastName"
            title="Last Name"
            validate={validateFields.LAST_NAME_VALIDATE}
          />
          <MyInput
            register={register}
            errors={errors}
            name="dateOfBirth"
            title="Date of birth"
            type="date"
            validate={validateFields.DATE_OF_BIRTH_VALIDATE}
          />
        </fieldset>

        <fieldset className="registration__form__fieldset fieldset">
          <legend className="fieldset__heading">
            {headingText.SHIPPING_ADDRESS_FORM}
          </legend>
          <MyCheckBox
            register={register}
            errors={errors}
            name="defaultShippingAddress"
            title="Set as default address:"
          />
          <MyInput
            register={register}
            errors={errors}
            name="streetShipping"
            title="Street"
            validate={validateFields.STREET_VALIDATE}
          />
          <MyInput
            register={register}
            errors={errors}
            name="cityShipping"
            title="City"
            validate={validateFields.CITY_VALIDATE}
          />
          <MyInput
            register={register}
            errors={errors}
            name="postalCodeShipping"
            title="Postal code"
            validate={validateFields.POSTAL_CODE_VALIDATE}
          />
          <MyCountrySelect
            register={register}
            errors={errors}
            name="countryShipping"
            title="Country"
            countries={COUNTRIES}
          />

          <div className="checkbox__container">
            <label>Set the same address for billing:</label>
            <input
              type="checkbox"
              onChange={setBillingAddress}
              title="sameAddressToBilling"
            />
          </div>
        </fieldset>

        <fieldset className="registration__form__fieldset fieldset">
          <legend className="fieldset__heading">
            {headingText.BILLING_ADDRESS_FORM}
          </legend>
          <MyCheckBox
            register={register}
            errors={errors}
            name="defaultBillingAddress"
            title="Set as default address:"
          />
          <MyInput
            register={register}
            errors={errors}
            name="streetBilling"
            title="Street"
            validate={validateFields.STREET_VALIDATE}
            stateSameAddress={isSetSameAddress}
          />
          <MyInput
            register={register}
            errors={errors}
            name="cityBilling"
            title="City"
            validate={validateFields.CITY_VALIDATE}
            stateSameAddress={isSetSameAddress}
          />
          <MyInput
            register={register}
            errors={errors}
            name="postalCodeBilling"
            title="Postal code"
            validate={validateFields.POSTAL_CODE_VALIDATE}
            stateSameAddress={isSetSameAddress}
          />
          <MyCountrySelect
            register={register}
            errors={errors}
            name="countryBilling"
            title="Country"
            countries={COUNTRIES}
          />
        </fieldset>

        <div className="registration__button-wrapper">
          <span
            className={`error__message ${
              errors.root?.serverError ? 'error__message_visible' : ''
            }`}
            data-testid="server-error"
          >
            {errors.root?.serverError.message}
          </span>
          <button
            className="button registration__button"
            disabled={!isValid}
            type="submit"
          >
            {buttonsText.REGISTER}
          </button>
        </div>
      </form>
    </div>
  );
}
