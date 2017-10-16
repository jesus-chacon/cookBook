import { CLEAR_AUTH_INFO, UPDATE_LOGIN, UPDATE_USER_ID, UPDATE_AUTH_TOKEN, FULL_LOGIN } from './actionsTypes';

export function UpdateLogin (bool){
    return {
        type: UPDATE_LOGIN,
        isLogged: bool
    }
}

export function UpdateUserId (userId){
    return {
        type: UPDATE_USER_ID,
        userId
    };
}

export function UpdateAuthToken (token) {
    return {
        type: UPDATE_AUTH_TOKEN,
        token
    }
}

export function FullLogin(userId, token) {
    return {
        type: FULL_LOGIN,
        userId,
        token
    };
}

export function Logout() {
    return {
        type: CLEAR_AUTH_INFO
    }
}