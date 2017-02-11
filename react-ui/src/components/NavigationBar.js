import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';

import { logout } from '../actions/auth';


class NavigationBar extends React.Component{
    logout(e, dispatch){
        e.preventDefault();
        this.props.logout();
        browserHistory.push('/signin');
    }

    render(){
        const { isAuthenticated, user } = this.props.auth;
        //console.log(this.props.location);

        const authLinks = (
            <ul className="nav navbar-nav navbar-right">
             <li><Link to="/profile"><strong>Hi ! {user.username}</strong></Link></li>
             {user.role == 'admin'? <li><a href="/AdminDashboard">Logout</a></li>: '' }
             <li><a href="javascript.void(0)" onClick={this.logout.bind(this)}>Logout</a></li>
            </ul>
        )

        const guestLinks = (
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/signup">signup</Link></li>
              <li><Link to="/signin">Signin</Link></li>
            </ul>
        )

        const FrontEndAuthLink = (
            <li><Link to="/self-posts">Self Posts</Link></li>
        )

        const AdminNavLinks = (
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/admin/users">Users</Link></li>
              <li><Link to="/admin/posts">Posts</Link></li>
              <li><a href="javascript.void(0)" onClick={this.logout.bind(this)}>Logout</a></li>
            </ul>
        )

        const FrontEndSection = (
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to="/">React-Redux blog</Link>
                  <ul className="nav navbar-nav navbar-right">
                   <li><Link to="/all-posts">All Posts</Link></li>
                   {isAuthenticated ? FrontEndAuthLink : ''}
                  </ul>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                 {isAuthenticated ? authLinks : guestLinks}
                </div>
              </div>
            </nav>
        )

        const AdminSection = (
            <nav className="navbar navbar-default" style={{backgroundColor: "black"}}>
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to="/Admin">App Admin Section</Link>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">{AdminNavLinks}</div>
              </div>
            </nav>
        )

        return (
            <div>
                {user.role == 'admin' ? AdminSection : FrontEndSection}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

NavigationBar.propTypes = {
    auth: React.PropTypes.object,
    logout: React.PropTypes.func.isRequired
}

export default connect(mapStateToProps, {logout})(NavigationBar);
