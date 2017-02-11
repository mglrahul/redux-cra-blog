import React from 'react';
import { Field, reduxForm } from 'redux-form';
import isEmpty from 'lodash/isEmpty' ;

import { required, maxLength15, number, maxLength25, email, tooOld, aol } from '../utils/validations';
import validate from '../utils/signup_validate';
import { renderField } from '../utils/textFieldGroup';
import { signup } from '../actions/auth';


const SignupForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, submitSucceeded, error } = props
  return (
    <form onSubmit={handleSubmit(signup)} >
      <div className={(submitSucceeded==true)?'show alert alert-success': 'hidden'}>
        <strong>Success!</strong> Sign up is successfull, Please signin.
      </div>
      <Field name="username" type="text" component={renderField} label="Username" validate={[ required, maxLength25 ]}/>
      <Field name="email" type="email" component={renderField} label="Email" validate={[ required, email, maxLength25 ]}/>
      <Field name="password" type="password" component={renderField} label="Password" validate={[ required, maxLength25 ]}/>
      <Field name="confirm_password" type="password" component={renderField} label="Confirm Password"
        validate={[ required, maxLength25 ]} />
      <div>
        <button type="submit" disabled={submitSucceeded} className="btn btn-primary btn-lg">Submit</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'SignupForm',  // a unique identifier for this form
  validate
})(SignupForm)
