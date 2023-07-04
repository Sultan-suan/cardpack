import {Dispatch} from "redux";
import {authApi, packsApi} from "../api/api";

export type PackType = {
    _id: string;
    userId: string
    name: string;
    email: string;
    path?: string;
    cardsCount: number; // количество колод
    grade: number;
    shots: number;
    rating: number;
    type: string;
    created: string; // подтвердил ли почту
    updated: string;
}
export type InitialStateType = {
    cardPacks: PackType[]
    cardPacksTotalCount?:  number // количество колод
    maxCardsCount?: number
    minCardsCount?: number
    page?: number // выбранная страница
    pageCount?: number // количество элементов на странице
    // pack: PackType,
    // isAuth: boolean
    // isRegister: boolean
}
let initialState: InitialStateType = {
    cardPacks: [{} as PackType],
    cardPacksTotalCount: 14,// количество колод
    maxCardsCount: 4,
    minCardsCount: 0,
    page: 1, // выбранная страница
    pageCount: 4 // количество элементов на странице
}
type ActionType = SetCardPacksActionType

export type SetCardPacksActionType = {
    type: 'packs/SET_CARD_PACKS'
    cardPacks: PackType[]
}
//
// export type SetRegisterDataActionType = {
//     type: 'register/SET_REGISTER_DATA'
//
//     isRegister: boolean
// }
//
// export type SetIsAuthUserType = {
//     type: 'login/SET_IS_AUTH'
//     value: boolean
//
// }
//
const SET_CARD_PACKS = 'packs/SET_CARD_PACKS'
// const SET_IS_AUTH = 'login/SET_IS_AUTH'
// const SET_REGISTER_DATA = 'register/SET_REGISTER_DATA'
//
export const packsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_CARD_PACKS: {
            return {
                ...state,
                cardPacks: action.cardPacks
            }
        }
        // case SET_USER_DATA: {
        //     return {
        //         ...state,
        //         user: action.user
        //     }
        // }
        // case SET_IS_AUTH: {
        //     return {
        //         ...state,
        //         isAuth: action.value
        //     }
        // }
        default:
            return state
    }
}
//
//
export const setCardPacks = (cardPacks: any): SetCardPacksActionType => ({
    type: SET_CARD_PACKS, cardPacks
})
//
// export const setRegisterData = (isRegister: boolean): SetRegisterDataActionType => ({
//     type: SET_REGISTER_DATA, isRegister
// })
//
// export const setIsAuth = (value: boolean): SetIsAuthUserType => ({
//     type: SET_IS_AUTH, value
// })
//
//
//
//
//
export const getCardPacksTC = () => {
    return (dispatch: Dispatch) => {
        try {
            packsApi.get()
                .then((data) => {
                    dispatch(setCardPacks(data))
                    console.log(data)
                    // dispatch(setIsAuth(true))
                    // localStorage.setItem('token', data.token)
                })
        } catch (e) {
            console.log(e);
        }
    }
}
//
// export const RegisterTC = (email: string, password: string) => {
//     return async (dispatch: Dispatch) => {
//         try {
//             await authApi.getRegister(email, password)
//             dispatch(setRegisterData(true))
//         } catch (e) {
//             console.log('error from register', e);
//         }
//     }
// }
//
// export const authMeTC = (navigate: any) => async (dispatch: Dispatch) => {
//     try {
//         const token = localStorage.getItem("token")
//         if (token) {
//             const response = await authApi.authMe(token)
//             localStorage.setItem("token", response.token)
//             dispatch(setUserData(response))
//             dispatch(setIsAuth( true))
//         }
//     } catch (e) {
//         navigate('/login')
//         console.log('error from register', e);
//     }
// }
//
// export const logoutTC = (navigate: any) => async (dispatch: Dispatch) => {
//     try {
//         const token = localStorage.getItem("token")
//         if (token) {
//             const response = await authApi.logout(token)
//             localStorage.removeItem("token")
//             dispatch(setUserData(response))
//             dispatch(setIsAuth( false))
//             navigate('/login')
//         }
//     } catch (e) {
//         console.log(e);
//     }
// }
//
//
