import axios from 'axios';
import { CATEGORY_DATA, SET_ALL_POST, SET_POST_DETAIL, RESET_POST } from '../utils/types';

export function categoryData(){
    return dispatch => {
        return axios.get('/api/post/allCategory').then((response) => {
            return response
        });
    }
}

export function setCategoryData(data){
    return {
        type: CATEGORY_DATA,
        payload: data
    }
}

export function postSubmit(data){
    return dispatch => {
        return axios.post('/api/post/postSubmit', data).then((response) => {
            return response
        })
    }
}

export function allPostsData(){
    return dispatch => {
        return axios.post('/api/post/getAllPosts').then((response) => {
            return response
        })
    }
}

export function getSelfPostsData(){
    return dispatch => {
        return axios.post('/api/post/getSelfPosts').then((response) => {
            return response
        })
    }
}

export function setAllPosts(paginatedData){
    return {
        type: SET_ALL_POST,
        payload: paginatedData
    }
}

export function resetPosts(){
    return {
        type: RESET_POST,
        payload: null
    }
}

export function fetchPostData(id){
    return dispatch => {
        return axios.get(`/api/post/getPostDetail/${id}`).then((response) => {
            return response.data.response
        })
    }
}

export function postDetails(data){
    return {
        type: SET_POST_DETAIL,
        payload: data
    }
}

export function postUpdate(data){
    return dispatch => {
        return axios.post('/api/post/updatePostDetails', data).then((response) => {
            return response
        })
    }
}

export function deletePost(id){
    return dispatch => {
        return axios.get(`/api/post/deletePost/${id}`).then((response) => {
            return response
        })
    }
}

export function peginatedPostsData(page){
    return dispatch => {
        return axios.post('/api/post/getAllPosts', {'page':page}).then((response) => {
            return response
        })
    }
}
