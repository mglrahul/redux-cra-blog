import React from 'react';
import { connect } from 'react-redux';

import SignupForm from '../components/SignupForm';
import { signup } from '../actions/auth';

class SignupPage extends React.Component {

    handleSubmit(values, dispatch){
        console.log('client',values);
        //this.props.signup(values)
        dispatch(signup(values))
    }

    render(){
        return(
            <div>
                <SignupForm onSubmit={this.handleSubmit} />
            </div>
        )
    }
}

SignupPage.propTypes = {
    signup: React.PropTypes.func.isRequired
}

export default connect(null, { signup })(SignupPage);
