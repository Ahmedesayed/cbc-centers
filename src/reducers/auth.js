import { CHECK_AUTHENTICATION, LOGOUT, LOGIN_SUCCESSFULL, REGISTER_SUCCESSFULL, REMEMBER_ME } from '../actions';
import initialize_state from '../helpers/initialize_state';


function Authentication(state = initialize_state.authentication, action) {
    switch (action.type) {
        case REGISTER_SUCCESSFULL:
            return { ...state, token: action.data.user.token, status: true, user_id: action.data.user.id };
        case LOGIN_SUCCESSFULL:
            return { ...state, token: action.data.token, status: true, user_id: action.data.user.id };
        case CHECK_AUTHENTICATION:
            return { ...state, token: action.data.token, status: action.data.status, user_id: action.data.user_id };
        case LOGOUT:
            return { ...state, token: '', status: false };
        case REMEMBER_ME:
            return { ...state, remember_me: action.data }
        default:
            return state
    }
}

export default Authentication;