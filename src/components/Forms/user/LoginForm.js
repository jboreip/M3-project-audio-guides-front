import React from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';


const LoginForm = ({values, errors, touched, isSubmitting, ...props}) => {
  return (
      <Form>
        <label htmlFor='email'>Email:</label>
        <Field type='email' name='email' placeholder='E-mail'/>
        {errors.email && touched.email ? <p className='error-message'>{errors.email}</p> : null}
        <label htmlFor='password'>Password:</label>
        <Field type='password' name='password' placeholder='Password'/>
        {errors.password && touched.password ? <p className='error-message'>{errors.password}</p> : null}
        <button disabled={isSubmitting && true} className='btn btn-primary' type='submit'> Login </button>
      </Form>
  );
}

export default withFormik({
  mapPropsToValues({email, password}) {
    return ({
      email: email || '',
      password: password || ''
    })
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('E-mail has to be correct!')
      .required('Please introduce your e-mail'),
    password: Yup.string()
      .min(8)
      .required("Don't forget the password genius")
  }),
  handleSubmit(values, {props, setSubmitting, setErrors, resetForm})  {
    props.doLogin(values)
    resetForm()
    setSubmitting(false);
  }
 })(LoginForm);

