import React from 'react';
import { connect } from 'react-redux';

import LoginForm from '../components/LoginForm';

class LoginPage extends React.Component  {

    render(){
        return(
            <div>
                <h1>Login Page</h1>
                <LoginForm onSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default connect(null, { })(LoginPage);
