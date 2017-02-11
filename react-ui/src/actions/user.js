import axios from 'axios';
import { PROFILE_DATA,
    DELETE_PROFILE_DATA,
    SET_ALL_USER,
    RESET_USERS,
    SET_USER_DETAIL,
    RESET_USER_DETAIL } from '../utils/types';

//export const profileUpdate = (data) => {
export function profileUpdate(data){
    return dispatch => {
        return axios.post('api/users/profileUpdate', data)
    }
}

export function setProfileData(data){
    return {
      type: PROFILE_DATA,
      payload: data
    };
}

export function profile(){
    return dispacth => {
        return axios.get('api/users/getprofile').then((response) => {
            return response.data
        })
    };
}

export function resetProfileData(){
    return {
        type: DELETE_PROFILE_DATA
    }
}

export function allUsersData(){
    return dispatch => {
        return axios.post('/api/users/getAllUsers').then((response) => {
            return response
        })
    }
}

export function setAllUsers(users){
    return {
        type: SET_ALL_USER,
        payload: users
    }
}

export function peginatedUsersData(page){
    return dispatch => {
        return axios.post('/api/users/getAllUsers', {'page':page}).then((response) => {
            return response
        })
    }
}

export function resetUsers(){
    return {
        type: RESET_USERS,
        payload: null
    }
}

export function getUserDetail(id){
    return dispatch => {
        return axios.post('/api/users/getUserDetail', {'id':id}).then((response) => {
            return response.data.response
        })
    }
}

export function setUserDetails(data){
    return {
        type: SET_USER_DETAIL,
        payload: data
    }
}

export function resetUserDetails(){
    return {
        type: RESET_USER_DETAIL,
        payload: null
    }
}
