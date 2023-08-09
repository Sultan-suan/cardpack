import axios from "axios";
import {ResponseCardsPackType} from "../types/types";
import {objectToString} from "../helpers/helpers";
import {SearchParamsStateType} from "../state/pack-search-reducer";

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
    getPacks: (objectOfParams: SearchParamsStateType) => {
        return instance.get<ResponseCardsPackType>(`cards/pack?${objectToString(objectOfParams)}`)
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
    },
    editPack: (packId: string,newPackName: string) => {
        return instance.put('cards/pack', {cardsPack: {
                    _id: packId,
                    name: newPackName
                }
            })
            .then((response) => {
                return response.data
            })
    }
}