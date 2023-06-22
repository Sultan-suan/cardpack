import {Dispatch} from "redux";
import axios from "axios";
import {getLogin} from "../api/api";
// import {getLogin} from "../api/api";

export type UserType = {
    userId: any
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
}
export type InitialStateType = {
    user: UserType,
    isAuth: boolean
}
let initialState: InitialStateType = {
    user: {} as UserType,
    isAuth: false,
}
type ActionType = setIsAuthUserType | setUserDataActionType

export type setUserDataActionType = {
    type: 'login/SET_USER_DATA'
    user: UserType
}

export type setIsAuthUserType = {
    type: 'login/SET_IS_AUTH'
    value: boolean
}

const SET_USER_DATA = 'login/SET_USER_DATA'
const SET_IS_AUTH = 'login/SET_IS_AUTH'

export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                user: action.user
            }
        }
        case SET_IS_AUTH: {
            return {
                ...state,
                isAuth: action.value
            }
        }
        default:
            return state
    }
}

export const setUserData = (user: UserType): setUserDataActionType => ({
    type: SET_USER_DATA, user
})

export const setIsAuth = (value: boolean): setIsAuthUserType => ({
    type: SET_IS_AUTH, value
})


export const loginTC = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: Dispatch) => {
        try {
            getLogin(email, password, rememberMe)
                .then((data) => {
                    dispatch(setUserData(data))
                    dispatch(setIsAuth(true))
                })
        } catch (e) {
            debugger
            console.log(e);
        }
    }
}

