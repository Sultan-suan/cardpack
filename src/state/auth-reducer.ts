import {Dispatch} from "redux";
import axios from "axios";

export type InitialStateType = {
    userId: any
    login: any
    isAuth: boolean
    // isAuth: boolean
    // checked: boolean
    // captchaUrl: any
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод

    // created: Date;
    // updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
}

let initialState: InitialStateType = {
    userId: null,
    login: null,
    email: '',
    rememberMe: false,
    isAuth: false,
    _id: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0, // количество колод

    // created: Date,
    // updated: Date,
    isAdmin: false,
    verified: false, // подтвердил ли почту
    // isAuth: false,
    // checked: false,
    // captchaUrl: null
}

export type SetUserDataActionType = ReturnType<typeof setUserData>

const SET_USER_DATA = 'login/SET_USER_DATA'

export const authReducer = (state: InitialStateType = initialState, action: SetUserDataActionType): InitialStateType => {
    switch (action.type) {
        case "login/SET_USER_DATA": {
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        }
        default: return state
    }
}

export const setUserData = (email: string, publicCardPacksCount: number, name: string, created: string, updated: string) => ({
    type: SET_USER_DATA, data: {email, publicCardPacksCount, name, created, updated}
})



export const loginTC = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: Dispatch) => {
        try {
            axios.post('https://cards-nya-back-production.up.railway.app/2.0/auth/login', {email, password, rememberMe})
                .then((response) => {
                    console.log(response.data)
                    const {email, publicCardPacksCount, name, created, updated} = response.data
                    dispatch(setUserData(email, publicCardPacksCount, name, created, updated))
                })
        } catch (e) {
            console.log(e);
        }
    }
}

