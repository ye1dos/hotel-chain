import * as ActionType from '../types';
import {loginUrl} from "../../shared/BaseUrl";
import {adminLogoutApproved} from "./AdminLoginActionCreator";
import axios from "axios";
export const loginApprove = (res) => {
    return {
        type: ActionType.LoginApproved,
        payload: res
    }
}

export const loginFailure = (errorMessage) => {
    return {
        type: ActionType.LoginFailed,
        payload: errorMessage
    }
}

export const loginRequest = (user) => {
    return {
        type: ActionType.LoginRequest,
        payload: user
    }
}

export const logoutApproved = () => {
    return {
        type: ActionType.LogoutApproved
    }
};

export function login(userData){
    console.log(userData)
    return dispatch => {
        dispatch(loginRequest(userData));
        axios.post(`${loginUrl}?username=` + userData.userName + `&password=` + userData.password)
            .then(res => {

                console.log(res)
                if(res.status == 200){
                    dispatch(loginApprove(res))
                    localStorage.setItem('user', true);
                }
                else {
                    alert("Incorrect");
                    throw new Error("Error " + res.status)
                }
            })
            .catch(err => {
                dispatch(loginFailure(err));
            })
    }
}

export const logout = () => (dispatch) => {
    localStorage.setItem('user', false);
    localStorage.removeItem('userId');
    dispatch(logoutApproved());
};

