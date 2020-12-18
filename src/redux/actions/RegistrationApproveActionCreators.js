import {registrationUrl} from "../../shared/BaseUrl";
import * as ActionType from "../types";
import axios from 'axios';
import { useHistory } from 'react-router-dom';


export const registrationApproveLoading = () => {
    return {
        type: ActionType.RegistrationApproveLoading
    }
}

export const registrationApproved = (approveMessage) => {
    return {
        type: ActionType.RegistrationApproved,
        payload: approveMessage
    }
}

export const registrationFailed = (errorMessage) => {
    return {
        type: ActionType.RegistrationFailed,
        payload: errorMessage
    }
}

export function submitRegistrationForm(userData){
    console.log(JSON.stringify(userData))
    return dispatch => {
        dispatch(registrationApproveLoading());
        axios.post(`${registrationUrl}`, {userName: userData.userName, password: userData.password,
            ID_type: userData.ID_type, ID_number: userData.ID_number, guestStatus: userData.guestStatus})
            .then(res => {
                if(res.status == 200){
                    alert("Successful")
                    dispatch(registrationApproved(res))
                    localStorage.setItem('user', true);
                }
                else if (res.status == 401){
                    alert("Already exists")
                }
                else{
                    alert("Incorrect data!")
                }
            })
            .catch(err => {
                console.log(err.message + " explicitly")
                dispatch(registrationFailed(err.message));
            })
    }
}




