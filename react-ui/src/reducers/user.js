import { PROFILE_DATA, DELETE_PROFILE_DATA, SET_ALL_USER, RESET_USERS, SET_USER_DETAIL, RESET_USER_DETAIL } from '../utils/types';

const initialState ={
    profile: {}
}

export default (state = initialState, action={}) => {
    switch (action.type) {
        case PROFILE_DATA:
            return Object.assign({}, state, {
                profile: action.payload
            })
        case DELETE_PROFILE_DATA:
            return Object.assign({}, state, {
                profile: null
            })
        case SET_ALL_USER :
            return Object.assign({}, state, {
                allUsers: action.payload
            })
        case RESET_USERS:
            return Object.assign({}, state, {
                allUsers: action.payload
            })
        case SET_USER_DETAIL:
            return Object.assign({}, state, {
                userDetail: action.payload
            })
        case RESET_USER_DETAIL:
            return Object.assign({}, state, {
                userDetail: action.payload
            })
        default:
            return state;
    }
}
