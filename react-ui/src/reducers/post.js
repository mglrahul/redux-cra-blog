import { CATEGORY_DATA, SET_ALL_POST, SET_POST_DETAIL, SET_SELF_POST, RESET_POST } from '../utils/types';


export default(state = {}, action={}) => {
    switch (action.type) {
        case CATEGORY_DATA:
            return Object.assign({}, state, {
                category: action.payload
            })
        case SET_ALL_POST:
            return Object.assign({}, state, {
                AllPosts: action.payload
              })
        case RESET_POST:
            return Object({}, state, {
                AllPosts: null
            })
        case SET_POST_DETAIL:
            return Object.assign({}, state, {
                postDetail: action.payload
              })
        default:
            return state
    }
}
