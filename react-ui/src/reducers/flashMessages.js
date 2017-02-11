import { ADD_FLASH_MESSAGE, SIGNUP_FAILED } from '../utils/types';
import shortid from 'shortid';
import findIndex from 'lodash/findIndex';

export default (state = [], action = {}) => {
    //console.log('action', action);
    switch(action.type){
        case ADD_FLASH_MESSAGE:
            console.log('ADD_FLASH_MESSAGE_reducer');
            return [
                ...state,
                {
                    id: shortid.generate(),
                    cat: action.cat,
                    text: action.text
                }
            ];
        case 'DELETE_FLASH_MESSAGE':
            const index = findIndex(state, {id: action.id});
            if(index>=0){
                return [
                    ...state.slice(0, index),
                    ...state.slice(index+1)
                ];
            }
            return state
        default:
            return state;
    }
}
