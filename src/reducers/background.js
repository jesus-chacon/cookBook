import { CHANGE_BACKGROUND } from '../actions/actionsTypes';
import { INITIAL_STATE } from "../components/constants";

export default function backgroundReducer( state = INITIAL_STATE, action){
    switch (action.type) {
        case CHANGE_BACKGROUND:
            return {...state, background: action.background};
        default:
            return state;
    }
}
