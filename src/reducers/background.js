import { CHANGE_BACKGROUND } from '../actions/actionsTypes';

const initialState = {
    background: CHANGE_BACKGROUND
};

export default function backgroundReducer( state = initialState, action){
    switch (action.type) {
        case CHANGE_BACKGROUND:
            return {...state, background: action.background};
        default:
            return state;
    }
}
