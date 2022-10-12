import { LOGIN_START, LOGIN_SUCCESS , LOGIN_FAILED, SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAILED } from "../Actions/Action_Types";

const initialAuthState = {
    user:{},
    error:null,
    isLoggedIn:false,
    inProgress:false,
};

export default function auth(state=initialAuthState,action){
    switch(action.type){
        case LOGIN_START:
        case SIGNUP_START:
            return{
                ...state,
                inProgress:true,
            }
        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
            return{
                ...state,
                user: action.user,
                isLoggedIn: true,
                inProgress:false,
                error:null,
            }
        case LOGIN_FAILED:
        case SIGNUP_FAILED:
            return{
                ...state,
                error: action.error,
                inProgress:false,
            }
        default:
            return state;
    }
}