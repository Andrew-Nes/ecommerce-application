import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import type { RegistrationFormData } from '../../../types/registrationFormTypes';
import MyInput from './inputs/MyInput'
import classes from './RegistrationForm.module.scss';
import { validateFields } from './validateFields';
import MyCountrySelect from './inputs/MyCountrySelect';



export default function RegistrationForm() {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isValid },
      getValues,
      setValue,
    } = useForm<RegistrationFormData>({ mode: 'all' });
  
    const [isChoose, setSameAddress] = useState(false);

    const onSubmit: SubmitHandler<RegistrationFormData> = (data) => {
        console.log(data);
        reset();
      };


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

          <button
          className={classes.submit_button}
          disabled={!isValid}
          type="submit"
        >
          register
        </button>
</form>
</div>  
      )

}