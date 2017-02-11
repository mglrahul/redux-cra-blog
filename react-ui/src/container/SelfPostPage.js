
import {browserHistory} from 'react-router'
import {connect} from 'react-redux';

import { getSelfPostsData, setAllPosts, deletePost, peginatedPostsData, resetPosts } from '../actions/post';
import SelfPosts from '../components/SelfPosts';

const mapStateToProps = (state) => {
    return {
        AllPosts : state.post.AllPosts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        allPosts:() =>{
            dispatch(getSelfPostsData()).then((response) => {
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

const AllPostPage = connect(mapStateToProps, mapDispatchToProps)(SelfPosts);
export default AllPostPage;
