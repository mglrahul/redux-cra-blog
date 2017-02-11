import { connect } from 'react-redux';

import UpdatePost from '../components/UpdatePost';
import { categoryData, setCategoryData, fetchPostData, postDetails } from '../actions/post';

const mapStateToProps = (state) => {
    return {
        category: state.post.category,
        postDetail : state.post.postDetail
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPost:(id) => {
            dispatch(fetchPostData(id)).then((response) => {
                dispatch(postDetails(response))
            })
        },
        fetchCategoryData: () => {
            dispatch(categoryData()).then((response) => {
                dispatch(setCategoryData(response.data))
            })
        }
    }
}

const UpdatePostPage = connect(mapStateToProps, mapDispatchToProps)(UpdatePost)

export default UpdatePostPage;
