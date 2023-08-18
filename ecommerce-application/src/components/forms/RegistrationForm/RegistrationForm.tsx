import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import type { RegistrationFormData } from '../../../types/registrationFormTypes';
import MyInput from './inputs/MyInput';
import classes from './RegistrationForm.module.scss';
import { validateFields } from './validateFields';
import MyCountrySelect from './inputs/MyCountrySelect';
import MyCheckBox from './inputs/myCheckBox/MyCheckBox';
import MyPassInput from './inputs/MyPassInput';

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
  } = useForm<RegistrationFormData>({ mode: 'onTouched' });

  const [isChoose, setSameAddress] = useState(false);

  const onSubmit: SubmitHandler<RegistrationFormData> = () => {
    reset();
  };

  function setBillingAddress() {
    if (!isChoose) {
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
    <div className={classes.registration}>
      <h3>Registration form:</h3>
      <form
        className={classes.register__form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset>
          <legend className={classes.legend_fieldset}>Customer</legend>
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

        <fieldset>
          <legend className={classes.legend_fieldset}>Shipping address</legend>
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

          <div className={classes.checkbox__container}>
            <label>Set the same address for billing:</label>
            <input
              type="checkbox"
              onChange={setBillingAddress}
              title="sameAddressToBilling"
            />
          </div>
        </fieldset>

        <fieldset>
          <legend className={classes.legend_fieldset}>Billing address</legend>
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
          />
          <MyInput
            register={register}
            errors={errors}
            name="cityBilling"
            title="City"
            validate={validateFields.CITY_VALIDATE}
          />
          <MyInput
            register={register}
            errors={errors}
            name="postalCodeBilling"
            title="Postal code"
            validate={validateFields.POSTAL_CODE_VALIDATE}
          />
          <MyCountrySelect
            register={register}
            errors={errors}
            name="countryBilling"
            title="Country"
            countries={COUNTRIES}
          />
        </fieldset>

        <button
          className={classes.submit_button}
          disabled={!isValid}
          type="submit"
        >
          register
        </button>
      </form>
    </div>
  );
}
