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
        {/* <label htmlFor='city'>City:</label> */}
        {/* <Field id='city' type='hidden' name='city'/> */}
        {/* {errors.city && touched.city && <p>{errors.city}</p>} */}
        {/* <label htmlFor='location'>Location:</label> */}
        {/* <Field id='location' type='hidden' name='location'/> */}
        {/* {errors.location && touched.location && <p>{errors.location}</p>} */}
        {/* <label htmlFor='img'>Image:</label> */}
        {/* <Field id='img' type='text' name='img' /> */}
        {/* {errors.img && touched.img && <p>{errors.img}</p>} */}
        <label htmlFor='fromDate' style={{display:'none'}}>From date</label>
        <Field id='fromDate' type='date' name='fromDate' disabled={props.formDisabled}/>
        <label htmlFor='toDate' style={{display:'none'}}>To date</label>
        <Field id='toDate' type='date' name='toDate' disabled={props.formDisabled}/>
        {errors.fromDate && touched.fromDate && <p>{errors.fromDate}</p>}
        {errors.toDate && touched.toDate && <p>{errors.toDate}</p>}
        <button className={`btn add ${props.formDisabled ? 'btn-disabled' : 'btn-primary'}`} disabled={props.formDisabled} type='submit'> Add trip </button>
        {/* <button className={`btn btn-primary add`} disabled={isSubmitting && true} type='submit'> Add trip </button> */}
      </Form>
      </section>
      <Link to='/trips/' className='cancel'>Cancel</Link>
      </React.Fragment>
  );
}

export default withFormik({
  // mapPropsToValues({city, location, img, fromDate, toDate}) {
  mapPropsToValues({ fromDate, toDate}) {
  return ({
      // city: city || '',
      // location: location || '',
      // img: img || '',
      fromDate: fromDate || '',
      toDate: toDate || ''
    })
  },
  validationSchema: Yup.object().shape({
    // city: Yup.string()
    //   .required('City name is required'),
    // location: Yup.string()
    //   .required('Location is required'),
    // img: Yup.string()
    //   .required('Image is required'),
    fromDate: Yup.date()
      .required(),
    toDate: Yup.date()
      .required()
  }),

  handleSubmit(values, {props, setSubmitting, setErrors, resetForm})  {
    props.createNewTrip(values);
    resetForm();
    setSubmitting(false);
  }
 })(TripNewForm);

