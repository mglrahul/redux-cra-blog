import React from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent){
    class AdminMiddleware extends React.Component{
        componentWillMount(){
            if(!this.props.isAuthenticated){
                this.context.router.push('/signin');
            }else if(this.props.user.role !== 'admin'){
                this.context.router.push('/home');
            }
        }

        componentWillUpdate(nextProps){
            if(!nextProps.isAuthenticated){
                this.context.router.push('/');
            }
        }

        render(){
            return(
                <ComposedComponent {...this.props} />
            )
        }
    }

    AdminMiddleware.propTypes= {
        isAuthenticated: React.PropTypes.bool.isRequired,
        user: React.PropTypes.object.isRequired
    }

    AdminMiddleware.contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    const mapStateToProps = (state) => {
        return{
            isAuthenticated: state.auth.isAuthenticated,
            user: state.auth.user
        }
    }

    return connect(mapStateToProps, {})(AdminMiddleware);
}
