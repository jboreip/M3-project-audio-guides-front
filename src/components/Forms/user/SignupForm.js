import React from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';


const SignupForm = ({values, errors, touched, isSubmitting, ...props}) => {
  return (
      <Form>
        <label htmlFor='email'>Email:</label>
        <Field id='email' type='email' name='email' placeholder='Your email'/>
        {errors.email && touched.email && <p className='error-message'>{errors.email}</p>}
        <label htmlFor='password'>Password:</label>
        <Field id='password' type='password' name='password' placeholder='Password (min 8 char.)'/>
        {errors.password && touched.password && <p className='error-message'>{errors.password}</p>}
        <label htmlFor='name'>Name:</label>
        <Field id='name' type='text' name='name' placeholder='Your name'/>
        {errors.name && touched.name && <p className='error-message'>{errors.name}</p>}
        <div>
        <label htmlFor='birthdate'>Birthdate:</label>
        <Field id='birthdate' type='date' name='birthdate' />
        <label htmlFor='language'>Language:</label>
        <Field component='select' id='language' name='language'>
          <option value='' disabled>Language</option> 
          <option value='EN'>EN</option> 
          <option value='ES'>ES</option> 
        </Field>
        </div>
        {errors.birthdate && touched.birthdate && <p className='error-message'>{errors.birthdate}</p>}
        {errors.language && touched.language && <p className='error-message'>{errors.language}</p>}
        <button disabled={isSubmitting && true} className='btn btn-primary' type='submit'> Signup </button>
      </Form>
  );
}

export default withFormik({
  mapPropsToValues({email, password, name, birthdate, language}) {
    return ({
      email: email || '',
      password: password || '',
      name: name || '',
      birthdate: birthdate || '',
      language: language || ''
    })
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Please provide a valid one...')
      .required('Please provide your e-mail'),
    password: Yup.string()
      .min(8, '8 characters please...')
      .required('Password is required'),
    name: Yup.string()
      .min(2)
      .required('Name is required'),
    birthdate: Yup.date()
      .required('Birthdate is required'),
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
        props.dosignup(values);
        resetForm();
      }
      setSubmitting(false);
  }
 })(SignupForm);

