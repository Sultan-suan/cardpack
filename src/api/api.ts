import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://cards-nya-back-production.up.railway.app/2.0/'
})

export const getLogin = (email: string, password: string, rememberMe:boolean) => {
    return instance.post('auth/login/', {email, password, rememberMe})
        .then((response) => {
            return response.data
        })
}
export const getRegister = (email: string, password: string) => {
    return instance.post('auth/register/', {email, password})
        .then((response) => {
            return response.data
        })
}

