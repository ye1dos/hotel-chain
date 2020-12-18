import * as ActionTypes from './types';

export const Schedule = (state = {isLoading: false, errMess: null, schedule: [], req: 0}, action) => {
    switch (action.type) {
        case ActionTypes.Schedule_Loading:
            return {...state, isLoading: true, errMess: null, schedule: [], req: 0};
        case ActionTypes.Schedule_Failed:
            return {...state, isLoading: false, errMess: action.payload, schedule:[], req: 0};
        case ActionTypes.Schedule_Add:
            return {...state, isLoading: false, errMess: null, schedule: action.payload, req: 1};
        default:
            return state;
    }
};

export const RegistrationApprove = (state = {isLoading: false, approveInfo: null, errorMessage: null,isAuthenticated: localStorage.getItem('user') ? true : false}, action) => {

    switch (action.type){
        case ActionTypes.RegistrationApproveLoading:
            return {...state, isLoading: true, approveInfo: null, errorMessage: null};
        case ActionTypes.RegistrationApproved:
            return {...state, isLoading: false, approveInfo: action.payload, errorMessage: null};
        case ActionTypes.RegistrationFailed:
            return {...state, isLoading: false, approveInfo: null, errorMessage: action.payload};
        default:
            return state;
    }
}

export const Login = (state = {isLoading: false,
    isAuthenticated: localStorage.getItem('user') ? true : false,
    token : JSON.parse(localStorage.getItem('token')),
    id: JSON.parse(localStorage.getItem('userId')),
    expires_at: JSON.parse(localStorage.getItem('userId')),
    errorMessage: null}, action) => {
    switch (action.type){
        case ActionTypes.LoginRequest:
            return ({...state, isLoading: true, isAuthenticated: false, user: action.payload});
        case ActionTypes.LoginFailed:
            return ({...state, isLoading: false, isAuthenticated: false, errorMessage: action.payload});
        case ActionTypes.LoginApproved:
            return ({...state, isLoading: false, isAuthenticated: true, token: action.payload})
        case ActionTypes.LogoutApproved:
            return ({...state, isLoading: false, isAuthenticated: false, token: '', user: null, id: null});
        default:
            return state;
    }
};

export const AdminLogin = (state = {isLoading: false,
    isAuthenticated: localStorage.getItem('admin_token') ? true : false,
    user: JSON.parse(localStorage.getItem('admin')),
    admin_token : JSON.parse(localStorage.getItem('admin_token')),
    errorMessage: null}, action) => {
    switch (action.type){
        case ActionTypes.AdminLoginRequest:
            return ({...state, isLoading: true, isAuthenticated: false, admin: action.payload});
        case ActionTypes.AdminLoginFailed:
            return ({...state, isLoading: false, isAuthenticated: false, errorMessage: action.payload});
        case ActionTypes.AdminLoginApproved:
            return ({...state, isLoading: false, isAuthenticated: true, admin_token: action.payload});
        case ActionTypes.AdminLogoutApproved:
            return ({...state, isLoading: false, isAuthenticated: false, admin_token: '', admin: null});
        default:
            return state;
    }
};

export const Hotels = (state = [], action) => {
    switch(action.type){
        case ActionTypes.getHotels:
            return action.payload;
        case action.setHotels:
            return action.payload;

        default:
            return state;
    }
} 