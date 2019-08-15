import React from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';


const SignupForm = ({errors, isSubmitting}) => {
  console.log(errors)
  return (
    <div className="App">
      <Form>
        {errors.email && <p>{errors.email}</p>}
        <Field type='email' name='email' placeholder='Write your email'/>
        {errors.password && <p>{errors.password}</p>}
        <Field type='password' name='password' placeholder='Write your password'/>
        <button disabled={isSubmitting && true} type='submit'> submit </button>
      </Form>
    </div>
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
      .email('It has to be correct')
      .required(),
    password: Yup.string()
      .min(8)
      .required()
  }),
  handleSubmit(values, {setSubmitting, setErrors, resetForm})  {
    setTimeout(()=>{
      console.log(values)
      if(values.email === '1@1.com') {
        setErrors({
          email: 'email already taken'
        })
      } else {
        console.log('todo ok')
        resetForm()
      }
      setSubmitting(false);
    },2000)
  }
 })(SignupForm);

