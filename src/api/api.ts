import axios from "axios";
import {ResponseCardsPackType} from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://cards-nya-back-production.up.railway.app/2.0/'
})


export const authApi = {
    getLogin: (email: string, password: string, rememberMe: boolean) => {
        return instance.post('auth/login', {email, password, rememberMe})
            .then((response) => {
                return response.data
            })
    },
    getRegister: (email: string, password: string) => {
        return instance.post('auth/register', {email, password})
            .then((response) => {
                return response.data
            })
    },

    authMe: (token: string) => {
        return instance.post('auth/me', {token})
            .then((response) => {
                return response.data
            })
    },
    logout: (token: string) => {
        return instance.delete('auth/me?' + token)
            .then((response) => {
                return response.data
            })
    }
}

export const packsApi = {
    get: () => {
        return instance.get<ResponseCardsPackType>('cards/pack?pageCount=10')
            .then((response) => {
                return response.data
            })
    }
}