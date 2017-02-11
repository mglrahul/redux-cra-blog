import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import auth from './auth';
import user from './user';
import post from './post';

export default combineReducers({
    auth,
    user,
    post,
    form: formReducer
});
