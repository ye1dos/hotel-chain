import {RegistrationApprove, Schedule, AdminLogin, Login, Hotels} from './reducers';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';


const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsBlacklist, actionsCreators and other options
  });
export const configureStore = () => {
    const store = createStore(
        combineReducers({
            schedule: Schedule,
            registrationApproveState: RegistrationApprove,
            loginUser: Login,
            admin: AdminLogin,
            hotels: Hotels
        }),
        composeEnhancers(applyMiddleware(thunk, logger))
    );
    return store
};