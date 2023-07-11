import axios from "axios";
import {CardsPacksType, NewCardPackType, ResponseCardsPackType} from "../types/types";
import Login from "../components/login/Login";

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
    getPacks: () => {
        return instance.get<ResponseCardsPackType>('cards/pack?pageCount=10&user_id=639d91d96e80bf001ed7c478')
            .then((response) => {
                return response.data
            })
    },
    deletePack: (packId: string) => {
        return instance.delete('cards/pack?id=' + packId)
            .then((response) => {
                return response.data
            })
    },
    addPack: (newPackName: string) => {
        return instance.post('cards/pack', {cardsPack: {name: newPackName}})
            .then((response) => {
                return response.data
            })
    }
}