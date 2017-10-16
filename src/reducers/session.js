import { CLEAR_AUTH_INFO, UPDATE_AUTH_TOKEN, UPDATE_USER_ID, UPDATE_LOGIN, FULL_LOGIN } from '../actions/actionsTypes';
import { INITIAL_STATE, GC_USER_ID, GC_AUTH_TOKEN } from "../components/constants";

export default function sessionReducer( state = INITIAL_STATE, action ){
    let auth = state.auth;

    //console.log(action.type);
    switch (action.type) {
        case CLEAR_AUTH_INFO:
            localStorage.removeItem(GC_USER_ID);
            localStorage.removeItem(GC_AUTH_TOKEN);

            return { ...state, auth: { isLogged: false, userId: '', token: '' } };
        case FULL_LOGIN:
            localStorage.setItem(GC_USER_ID, action.userId);
            localStorage.setItem(GC_AUTH_TOKEN, action.token);

            return { ...state, auth: { isLogged: true, userId: action.userId, token: action.token } };
        case UPDATE_LOGIN:
            auth.isLogged = action.isLogged;
            return { ...state, auth };
        case UPDATE_USER_ID:
            localStorage.setItem(GC_USER_ID, action.userId);

            auth.userId = action.userId;
            return { ...state, auth };
        case UPDATE_AUTH_TOKEN:
            localStorage.setItem(GC_AUTH_TOKEN, action.token);

            auth.token = action.token;
            return { ...state, auth };
        default:
            return state;
    }
}
