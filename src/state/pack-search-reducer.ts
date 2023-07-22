import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {packsApi} from "../api/api";
import {CardsPacksType} from "../types/types";
import {setCardPacks} from "./packs-reducer";

type ActionsType =
    | ReturnType<typeof getPacksBySearch>
    | ReturnType<typeof setPageNumber>
    | ReturnType<typeof setPageCountNumber>
    | ReturnType<typeof setMinMaxPacks>
    | ReturnType<typeof setShowAllPacks>


export type SearchParamsStateType = {
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    user_id: string
    packName: string
}

const initialSearchState: SearchParamsStateType = {
    minCardsCount: 0,
    maxCardsCount: 25,
    page: 1,
    pageCount: 1,
    user_id: "",
    packName: "",
}

export const PackSearchReducer = (state: SearchParamsStateType = initialSearchState, action: ActionsType): SearchParamsStateType => {
    switch(action.type) {
        case 'GET_PACKS_BY_SEARCH':
            return {...state, packName: action.packName}
        case 'SET_PAGE_NUMBER':
            return {...state, page: action.page}
        case 'SET_PAGE_COUNT_NUMBER':
            return {...state, pageCount: action.pageCount}
        case 'SET_MIN_MAX_PACKS':
            return {...state, minCardsCount: action.min, maxCardsCount: action.max}
        case 'SET_ALL_PACKS':
            return {...state
                // , user_id: action.userId
            }
        default:
            return state
    }
}

export const getPacksBySearch = (packName: string) => ({
    type: 'GET_PACKS_BY_SEARCH' as const, packName
})
export const setPageNumber = (page: number) => ({
    type: 'SET_PAGE_NUMBER' as const, page
})
export const setPageCountNumber = (pageCount: number) => ({
    type: 'SET_PAGE_COUNT_NUMBER' as const, pageCount
})
export const setMinMaxPacks = (min: number, max: number) => ({
    type: 'SET_MIN_MAX_PACKS' as const, min, max
})
export const setShowAllPacks = (userId: string) => ({
    type: 'SET_ALL_PACKS' as const, userId
})

export const getAllCardPacksTC = (id: string) => {
    return (dispatch: Dispatch, state: AppRootStateType ) => {
        try {
            packsApi.getPacks( id, 8)
                .then((data) => {
                    dispatch(setCardPacks(data.cardPacks))
                })
        } catch (e) {
            console.log(e);
        }
    }
}

export const getPageCountNumberTC = (pageCount: number) => {
    return (dispatch: Dispatch, state: AppRootStateType) => {
        try {
            packsApi.getPacks( '', pageCount)
                .then((data) => {
                    dispatch(setCardPacks(data.cardPacks))
                })
        } catch (e) {
            console.log(e);
        }
    }
}

