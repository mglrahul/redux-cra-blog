import React from 'react';
import {browserHistory} from 'react-router'
import {connect} from 'react-redux';

import { allPostsData, setAllPosts, deletePost, peginatedPostsData, resetPosts } from '../actions/post';
import AdminPosts from '../components/AdminPosts';

const mapStateToProps = (state) => {
    return {
        AllPosts : state.post.AllPosts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        allPosts:() =>{
            dispatch(allPostsData()).then((response) => {
                dispatch(setAllPosts(response.data.response))
            })
        },
        reset:() => {
            dispatch(resetPosts())
        },
        deletePostRecord:(id) => {
            dispatch(deletePost(id)).then((response) => {
                browserHistory.push('/')
            })
        },
        peginatedPosts: (page) => {
            dispatch(peginatedPostsData(page)).then((response) => {
                dispatch(setAllPosts(response.data.response))
            })
        }
    }
}

const AdminPostsPage = connect(mapStateToProps, mapDispatchToProps)(AdminPosts);
export default AdminPostsPage;
