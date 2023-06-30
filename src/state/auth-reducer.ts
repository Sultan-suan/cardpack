import {Dispatch} from "redux";
import axios from "axios";
import {authMe, getLogin, getRegister} from "../api/api";
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
    isRegister: boolean
}
let initialState: InitialStateType = {
    user: {} as UserType,
    isAuth: false,
    isRegister: false
}
type ActionType = setIsAuthUserType | setUserDataActionType | setRegisterDataActionType

export type setUserDataActionType = {
    isAuth: boolean
    type: 'login/SET_USER_DATA'
    user: UserType
}

export type setRegisterDataActionType = {
    type: 'register/SET_REGISTER_DATA'

    isRegister: boolean
}

export type setIsAuthUserType = {
    isAuth: boolean
    type: 'login/SET_IS_AUTH'
    value: boolean

}

const SET_USER_DATA = 'login/SET_USER_DATA'
const SET_IS_AUTH = 'login/SET_IS_AUTH'
const SET_REGISTER_DATA = 'register/SET_REGISTER_DATA'

export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_REGISTER_DATA: {
            return {
                ...state,
                isRegister: action.isRegister
            }
        }
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


export const setUserData = (user: UserType, isAuth: boolean): setUserDataActionType => ({
    type: SET_USER_DATA, user, isAuth
})

export const setRegisterData = (isRegister: boolean): setRegisterDataActionType => ({
    type: SET_REGISTER_DATA, isRegister
})

export const setIsAuth = (value: boolean, isAuth: boolean): setIsAuthUserType => ({
    type: SET_IS_AUTH, value, isAuth
})


export const loginTC = (email: string, password: string, rememberMe: boolean, isAuth: boolean) => {
    return (dispatch: Dispatch) => {
        try {
            getLogin(email, password, rememberMe)
                .then((data) => {
                    dispatch(setUserData(data, isAuth))
                    dispatch(setIsAuth(true, true))
                    localStorage.setItem('token', data.token)
                })
        } catch (e) {
            console.log(e);
        }
    }
}

export const RegisterTC = (email: string, password: string) => {
    return async (dispatch: Dispatch) => {
        try {
            await getRegister(email, password)
            dispatch(setRegisterData(true))
        } catch (e) {
            console.log('error from register', e);
        }
    }
}

export const authMeTC = (navigate: any) => async (dispatch: Dispatch) => {
        try {
            dispatch(setIsAuth(true, true))
            const token = localStorage.getItem("token")
            if (token) {
                const response = await authMe()
                localStorage.setItem("token", response.data.token)
                dispatch(setIsAuth(response.data.user, true))
            }
        } catch (e) {
            navigate('/admin')
            console.log('error from register', e);
        }
    }


