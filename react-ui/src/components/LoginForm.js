import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {browserHistory} from 'react-router';

import { required, email, maxLength25 } from '../utils/validations';
import validate from '../utils/signup_validate';
import { renderField } from '../utils/textFieldGroup';
import { login, setCurrentUser } from '../actions/auth';
import { SubmissionError } from 'redux-form';


const validateAndsendData = (values, dispatch) => {
    return dispatch(login(values))
    .then((user) => {
        dispatch(setCurrentUser(user))
        if(user.role === 'admin'){
            browserHistory.push('/Admin')
        }else {
            browserHistory.push('/')
        }
    })
    .catch((error) => {
        throw new SubmissionError({ _error: error.response.data.errors});
    })
}

const LoginForm = (props) => {
    const { handleSubmit, submitSucceeded, error } = props

    return (
      <form onSubmit={handleSubmit(validateAndsendData)}>
        <div className={typeof error!=='undefined'?'show alert alert-danger': 'hidden'}>
         <strong>Error!</strong> {error}
        </div>
        <Field name="email" type="text"
          component={renderField} label="Email"
          validate={[ required, email, maxLength25 ]}
        />
        <Field name="password" type="password"
          component={renderField} label="Password"
          validate={[ required, maxLength25 ]}
        />
        <p>
          <button type="submit" disabled={submitSucceeded} className="btn btn-primary btn-lg">Submit</button>
        </p>
      </form>
    )
}

export default reduxForm({
  form: 'loginForm', // a unique identifier for this form
  validate
})(LoginForm)
