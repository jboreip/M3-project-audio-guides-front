import React from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';


const SignupForm = ({values, errors, touched, isSubmitting, ...props}) => {
  return (
      <Form>
        <label htmlFor='email'>Email:</label>
        <Field id='email' type='email' name='email'/>
        {errors.email && touched.email && <p>{errors.email}</p>}
        <label htmlFor='password'>Password:</label>
        <Field id='password' type='password' name='password'/>
        {errors.password && touched.password && <p>{errors.password}</p>}
        <label htmlFor='name'>Name:</label>
        <Field id='name' type='text' name='name' />
        {errors.name && touched.name && <p>{errors.name}</p>}
        <label htmlFor='birthdate'>Birthdate:</label>
        <Field id='birthdate' type='date' name='birthdate' />
        {errors.birthdate && touched.birthdate && <p>{errors.birthdate}</p>}
        <label htmlFor='city'>City:</label>
        <Field id='city' type='text' name='city' />
        {errors.city && touched.city && <p>{errors.city}</p>}
        <label htmlFor='language'>Language:</label>
        <Field component='select' id='language' name='language'>
          <option value='' disabled>Select your language:</option> 
          <option value='EN'>EN</option> 
          <option value='ES'>ES</option> 
        </Field>
        {errors.language && touched.language && <p>{errors.language}</p>}
        <button disabled={isSubmitting && true} type='submit'> submit </button>
      </Form>
  );
}

export default withFormik({
  mapPropsToValues({email, password, name, birthdate, city, language}) {
    return ({
      email: email || '',
      password: password || '',
      name: name || '',
      birthdate: birthdate || '',
      city: city || '',
      language: language || ''
    })
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Please provide a valid e-mail')
      .required(),
    password: Yup.string()
      .min(8)
      .required('Password is required'),
    name: Yup.string()
      .min(2)
      .required(),
    birthdate: Yup.date()
      .required(),
    city: Yup.string()
      .min(4)
      .required(),
    language: Yup.string()
      .oneOf(['EN', 'ES', 'CN', 'HD', 'RS', 'PT', 'JP', 'AR'])
      .min(1)
      .required('Language is required')
  }),
  handleSubmit(values, {props, setSubmitting, setErrors, resetForm})  {
      if(values.email === '1@1.com') {
        setErrors({
          email: 'This email already taken'
        })
      } else {
        console.log(props);
        props.dosignup(values);
        resetForm();
      }
      setSubmitting(false);
  }
 })(SignupForm);

