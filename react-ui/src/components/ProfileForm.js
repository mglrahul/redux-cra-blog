import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { required, maxLength25 } from '../utils/validations';
import { renderField,
    renderSelectField,
    renderRadioField,
    renderTextAreaField,
    renderCheckboxField
} from '../utils/textFieldGroup';
import countries from '../utils/countryList';
import { profileUpdate } from '../actions/user';
import { SubmissionError } from 'redux-form';

const validateAndUpdateRecords = (values, dispatch) => {
    return dispatch(profileUpdate(values))
    .catch((error) => {
        throw new SubmissionError({ _error: error.response.data.errors});
    })
}

class ProfileForm extends React.Component {
    componentWillMount(dispatch){
        this.props.fetchProfile();
    }

    componentWillUnmount() {
       this.props.resetMe();
    }

    render(){
        const { handleSubmit, submitSucceeded, error } = this.props


        return (
            <div>
                <h1>Profile Page</h1>
                <form onSubmit={handleSubmit(validateAndUpdateRecords)}>
                    <div className={typeof error!=='undefined'?'show alert alert-danger': 'hidden'}>
                     <strong>Error!</strong> {error}
                    </div>
                    <div className={(submitSucceeded===true)?'show alert alert-success': 'hidden'}>
                      <strong>Success!</strong> Profile Data is updated!.
                    </div>
                    <Field name="fname" type="text" component={renderField} label="First Name"
                      validate={[ required, maxLength25 ]}
                    />
                    <Field name="lname" type="text" component={renderField} label="Last Name"
                      validate={[ required, maxLength25 ]}
                    />
                    <Field component={renderRadioField} name="gender" label="Gender" options={[
                        { title: 'Male', value: 'male' },
                        { title: 'Female', value: 'female' }
                    ]} validate={ required } />
                    <Field name="country" type="text" data={countries} component={renderSelectField} label="Country"
                      validate={[ required ]}
                    />
                    <Field name="about_us" type="text" component={renderTextAreaField} label="About Us"
                      validate={[ required ]}
                    />
                    <Field name="newsletter" type="checkbox" component={renderCheckboxField} label="Newsletter"
                      validate={[ required ]}
                    />
                    <p>
                      <button type="submit" disabled={submitSucceeded} className="btn btn-primary btn-lg">Submit</button>
                    </p>
                </form>
            </div>
        )
    }
}

ProfileForm = reduxForm({
    form:'profile',
    enableReinitialize : true
})(ProfileForm)

ProfileForm = connect(
  state => ({
    initialValues: state.user.profile
  })
)(ProfileForm)

export default ProfileForm;
