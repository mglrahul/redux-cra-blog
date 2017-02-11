import React from 'react';
import { connect } from 'react-redux';
import { categoryData, setCategoryData, postSubmit } from '../actions/post';

import CreatePost from '../components/CreatePost';

const mapStateToProps = (state) => {
    return{
        category: state.post.category
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        fetchCategoryData: () => {
            dispatch(categoryData()).then((response) => {
                dispatch(setCategoryData(response.data))
            })
        }
    }
}

const BlogPost = connect(mapStateToProps, mapDispatchToProps)(CreatePost)

export default BlogPost;
