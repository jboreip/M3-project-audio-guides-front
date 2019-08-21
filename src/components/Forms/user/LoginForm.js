import React from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';


const LoginForm = ({values, errors, touched, isSubmitting, ...props}) => {
  return (
      <Form>
        <Field type='email' name='email' placeholder='Email'/>
        {errors.email && touched.email ? <p>{errors.email}</p> : null}
        <Field type='password' name='password' placeholder='Password'/>
        {errors.password && touched.password ? <p>{errors.password}</p> : null}
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
      .email('e-mail has to be correct, please check!')
      .required(),
    password: Yup.string()
      .min(8)
      .required()
  }),
  handleSubmit(values, {props, setSubmitting, setErrors, resetForm})  {
    props.doLogin(values)
    resetForm()
    setSubmitting(false);
  }
 })(LoginForm);

