import React from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import TripMap from '../../Trips/TripMap'
import { Link } from 'react-router-dom';


const TripNewForm = ({values, errors, touched, isSubmitting, ...props}) => {
  return (
      <React.Fragment>
      <section className='trip-map'>
        <TripMap getLocationFromMap={props.getLocationFromMap}/>
      </section>
      <section className='form-container'>
      <p style={{'margin-top': 40}}> When are you travelling?</p>
      <Form className='new-trip'>
        <label htmlFor='fromDate' style={{display:'none'}}>From date</label>
        <Field id='fromDate' type='date' name='fromDate' disabled={props.formDisabled}/>
        <label htmlFor='toDate' style={{display:'none'}}>To date</label>
        <Field id='toDate' type='date' name='toDate' disabled={props.formDisabled}/>
        {errors.fromDate && touched.fromDate && <p className='error-message'>{errors.fromDate}</p>}
        {errors.toDate && touched.toDate && <p className='error-message'>{errors.toDate}</p>}
        <button className={`btn add ${props.formDisabled ? 'btn-disabled' : 'btn-primary'}`} disabled={props.formDisabled} type='submit'> Add trip </button>
        {/* <button className={`btn btn-primary add`} disabled={isSubmitting && true} type='submit'> Add trip </button> */}
      </Form>
      </section>
      <Link to='/trips/' className='cancel'>Cancel</Link>
      </React.Fragment>
  );
}

export default withFormik({
  mapPropsToValues({ fromDate, toDate}) {
  return ({
      fromDate: fromDate || '',
      toDate: toDate || ''
    })
  },
  validationSchema: Yup.object().shape({
    fromDate: Yup.date()
      .required('From date is required'),
    toDate: Yup.date()
      .required('To date is required')
  }),

  handleSubmit(values, {props, setSubmitting, setErrors, resetForm})  {
    props.createNewTrip(values);
    resetForm();
    setSubmitting(false);
  }
 })(TripNewForm);

