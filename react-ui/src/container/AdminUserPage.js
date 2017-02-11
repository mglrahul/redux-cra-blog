import React from 'react';
import {browserHistory} from 'react-router'
import {connect} from 'react-redux';

import { allUsersData, setAllUsers, peginatedUsersData, resetUsers } from '../actions/user';
import AdminUser from '../components/AdminUser';

const mapStateToProps = (state) => {
    return {
        AllUser : state.user.allUsers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        AllUsers:() =>{

            dispatch(allUsersData()).then((response) => {
                dispatch(setAllUsers(response.data.response))
            })
        },
        peginatedUsers: (page) => {
            dispatch(peginatedUsersData(page)).then((response) => {
                dispatch(setAllUsers(response.data.response))
            })
        },
        reset:() => {
            dispatch(resetUsers())
        },
    }
}

const AdminUserPage = connect(mapStateToProps, mapDispatchToProps)(AdminUser);
export default AdminUserPage;
