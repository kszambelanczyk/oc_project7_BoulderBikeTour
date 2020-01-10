import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';



const ContestSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  slogan: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const initialState = { firstName: '', lastName: '', email: '', slogan: '' };

class Contest extends React.Component {

  state = {
    crf: null,
    isSubmitting: false,
    successfullySubmitted: false,
  }

  componentDidMount() {
    const crf =  document.getElementsByName("csrf-token")[0].getAttribute("content");
    this.setState(()=>({crf: crf}));
  }


  onSubmit = (values, actions) => {
    const { crf } = this.state;
    this.setState(() => ({isSubmitting: true, successfullySubmitted: false}),()=>{
      try {
        axios.post(`/api/slogans`,{
          slogan: {
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            slogan: values.slogan
          }
        }, {headers: {'X-CSRF-Token': crf}})
        .then(res => {
          this.setState(()=>({isSubmitting: false, successfullySubmitted: true}));
          actions.setSubmitting(false);
          actions.resetForm(initialState);
        });
      } 
      catch(error) {
        console.error(error);
      }
    });



  }

  render() {
    const { successfullySubmitted, isSubmitting } = this.state;
    // console.log(isSubmitting);

    let successInfo = <div></div>;
    if (successfullySubmitted) {
      successInfo = (
        <div className="success-message">Slogan submitted. Thank you for your support!</div>
      )
    }

    return (
      <>
        <h2>Contest</h2>
        <p>Please help us with choosing The Boulder Bike Tour slogan. Fill your proposition in form below. Thank you!</p>
        <Formik
          initialValues={ initialState }
          validationSchema={ContestSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            this.onSubmit(values, { setSubmitting, resetForm })
          }} >
          <Form className="test">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <Field name="firstName" type="text" className="form-control" />
              <ErrorMessage name="firstName" component="div" className="text-danger"/>
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <Field name="lastName" type="text" className="form-control" />
              <ErrorMessage name="lastName" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <Field name="email" type="email" className="form-control" />
              <ErrorMessage name="email" />
            </div>
            <div className="form-group">
              <label htmlFor="slogan">Slogan</label>
              <Field name="slogan" type="text" as="textarea" className="form-control" />
              <ErrorMessage name="slogan" />
            </div>
            <div className="text-center">
              <button type="submit" className="submit-button" disabled={isSubmitting} >{ isSubmitting ? 'Submitting...' : 'Submit' }</button>
            </div>
          </Form>
        </Formik>
        {successInfo}
      </>
    );
  }
}

export default Contest;