import React from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import TripMap from '../../Trips/TripMap'



const TripNewForm = ({values, errors, touched, isSubmitting, ...props}) => {
  return (
      <Form>
        {/* <label htmlFor='city'>City:</label> */}
        <Field id='city' type='hidden' name='city'/>
        {errors.city && touched.city && <p>{errors.city}</p>}
        {/* <label htmlFor='location'>Location:</label> */}
        <div className='trip-map'><TripMap/></div>
        <Field id='location' type='hidden' name='location'/>
        {errors.location && touched.location && <p>{errors.location}</p>}
        <label htmlFor='img'>Image:</label>
        <Field id='img' type='text' name='img' />
        {errors.img && touched.img && <p>{errors.img}</p>}
        <label htmlFor='fromDate'>From:</label>
        <Field id='fromDate' type='date' name='fromDate' />
        {errors.fromDate && touched.fromDate && <p>{errors.fromDate}</p>}
        <label htmlFor='toDate'>To:</label>
        <Field id='toDate' type='date' name='toDate' />
        {errors.toDate && touched.toDate && <p>{errors.toDate}</p>}
        <br/>
        <button disabled={isSubmitting && true} type='submit'> submit </button>
      </Form>
  );
}

export default withFormik({
  mapPropsToValues({city, location, img, fromDate, toDate}) {
    return ({
      city: city || '',
      location: location || '',
      img: img || '',
      fromDate: fromDate || '',
      toDate: toDate || ''
    })
  },
  validationSchema: Yup.object().shape({
    city: Yup.string()
      .required('City name is required'),
    location: Yup.string()
      .required('Location is required'),
    img: Yup.string()
      .required('Image is required'),
    fromDate: Yup.date()
      .required(),
    toDate: Yup.date()
      .required()
  }),

  handleSubmit(values, {props, setSubmitting, setErrors, resetForm})  {
    console.log(props);
    props.createNewTrip(values);
    resetForm();
    setSubmitting(false);
  }
 })(TripNewForm);

