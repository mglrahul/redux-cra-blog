import axios from 'axios';

import { SubmissionError } from 'redux-form'
import setAuthorizationsToken from '../utils/setAuthorizationsToken';
import { SET_CURRENT_USER } from '../utils/types';
import jwtDecode from 'jwt-decode';

export function signup(data) {
    return axios.post('api/auth/signup', data)
    .then(() => {
           //console.log('signup done');
     })
     .catch((error) => {
           throw new SubmissionError(error.response.data.errors);
     });
}

export function login(data){
    return dispacth => {
        return axios.post('api/auth/login', data).then((response) => {
            const token = response.data.token
            localStorage.setItem('jwtToken', token)
            setAuthorizationsToken(token)
            return jwtDecode(localStorage.jwtToken)
        })
    };
}

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user: user
    }
}

export function logout(){
    return dispatch =>{
        localStorage.removeItem('jwtToken')
        setAuthorizationsToken(false)
        dispatch(setCurrentUser({}))
    }
}
