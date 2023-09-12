import {Dispatch} from "redux";
import {cardsApi, packsApi} from "../api/api";
import {CardsPacksType, CardsType} from "../types/types";
import {AppRootStateType} from "./store";
import {ObjectType} from "../helpers/helpers";
import {SearchParamsStateType} from "./pack-search-reducer";
import {setLoading} from "./packs-reducer";


export type InitStateType = {
    cards: CardsType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    token?: string
    tokenDeathTime?: number
    packUserId: string
    packId: string
    packTitle: string
}
let initialState: InitStateType = {
    cards: [],
    cardsTotalCount: 3,
    maxGrade: 4.987525071790364,
    minGrade: 2.0100984354076568,
    page: 1,
    pageCount: 4,
    packUserId: "",
    packId: '',
    packTitle: ''
    //     {
    //     min: 0,
    //     max: 25,
    //     page: 1,
    //     pageCount: 8,
    //     user_id: "",
    //     packName: "",
    //     sortPacks: ''
    // }
}

type ActionType =
    SetCardActionType
    | DeleteCardPacksActionType
    | AddNewCardActionType
    | ChangeCardPackTitleActionType
    | SetTotalCardPacksCountType
    | SetPackIdType
    | SetTitleType

export type SetCardActionType = {
    type: 'cards/SET_CARDS';
    data: CardsType[];
}

export  type AddNewCardActionType = {
    type: 'packs/ADD_NEW_CARD';
    newCard: any
}

export type DeleteCardPacksActionType = {
    type: 'packs/DELETE_CARD_PACKS';
    packId: string;
}

export type ChangeCardPackTitleActionType = {
    type: 'packs/CHANGE_CARD_PACK_TITLE'
    packId: string
    newTitle: string
}

export type SetTotalCardPacksCountType = {
    type: 'packs/SET_TOTAL_CARD_PACKS_COUNT'
    totalCount: number
}

export type SetPackIdType = {
    type: 'packs/SET_PACK_ID'
    packId: string
}

export type SetTitleType = {
    type: 'packs/SET_TITLE'
    title: string
}


const SET_CARDS = 'cards/SET_CARDS'
const DELETE_CARD_PACKS = 'packs/DELETE_CARD_PACKS'
const ADD_NEW_CARD = 'packs/ADD_NEW_CARD'
const CHANGE_CARD_PACK_TITLE = 'packs/CHANGE_CARD_PACK_TITLE'
const SET_TOTAL_CARD_PACKS_COUNT = 'packs/SET_TOTAL_CARD_PACKS_COUNT'
const SET_PACK_ID = 'packs/SET_PACK_ID'
const SET_TITLE = 'packs/SET_TITLE'

export const cardsReducer = (state: InitStateType = initialState, action: ActionType): InitStateType => {
    switch (action.type) {
        case SET_CARDS: {
            return {
                ...state,
                cards: action.data
            }
        }
        //       case DELETE_CARD_PACKS: {
        //           return {
        //               ...state, cardsPacks: state.cardsPacks.filter(pack => pack._id !== action.packId)
        //           }
        //       }
        case ADD_NEW_CARD: {
            return {
                ...state,
                cards: [ ...state.cards, action.newCard]
            }
        }
        //       case CHANGE_CARD_PACK_TITLE: {
        //           return {
        //               ...state,
        //               cardsPacks: state.cardsPacks.map(pack => pack._id === action.packId ? {
        //                   ...pack,
        //                   name: action.newTitle
        //               } : pack)
        //           }
        //       }
        //       case SET_TOTAL_CARD_PACKS_COUNT: {
        //           return {
        //               ...state,
        //               cardPacksTotalCount: action.totalCount
        //           }
        //       }
        case SET_PACK_ID: {
            return {
                ...state,
                packId: action.packId
            }
        }
        //
        case SET_TITLE: {

            return {
                ...state,
                packTitle: action.title
            }
        }

        default:
            return state
    }
}

export const setCards = (data: CardsType[]): SetCardActionType => ({
    type: SET_CARDS, data
})

// export const deleteCardPack = (packId: string): DeleteCardPacksActionType => ({
//     type: DELETE_CARD_PACKS, packId
// })
//
export const addNewCard = (newCard: CardsType): AddNewCardActionType => ({
    type: ADD_NEW_CARD, newCard
})
//
// export const changeCardPackTitle = (packId: string, newTitle: string): ChangeCardPackTitleActionType => ({
//     type: CHANGE_CARD_PACK_TITLE, packId, newTitle
// })
// export const setTotalCardPackCount = (totalCount: number) => ({
//     type: SET_TOTAL_CARD_PACKS_COUNT, totalCount
// })
//
export const setPackId = (packId: string) => ({
    type: 'packs/SET_PACK_ID', packId
})
//
export const setTitle = (title: string) => ({
    type: SET_TITLE, title
})


export const getCardsTC = (id: string) => {
    return async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setLoading(true))
            dispatch(setPackId(id))
            console.log(id)
            // console.log(getState().packsReducer.object)
            const response = await cardsApi.getCards(id)
            dispatch(setCards(response.cards))
            console.log(response)

            // dispatch(setTotalCardPackCount(response.cardPacksTotalCount))
        } catch (e) {
            console.log(e);
        } finally {
            dispatch(setLoading(false))
        }
    }
}

// export const deleteCardPacksTC = (id: string) => {
//     return (dispatch: Dispatch) => {
//         try {
//             packsApi.deletePack(id)
//                 .then(() => {
//                     dispatch(deleteCardPack(id))
//                 })
//         } catch (e) {
//             console.log(e);
//         }
//     }
// }

export const addNewCardTC = (packId: string, question: string, answer: string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(setLoading(true))
            const response = await cardsApi.addCard(packId, question, answer)
            dispatch(addNewCard(response.newCard))
        } catch (e) {
            console.log(e);
        } finally {
            dispatch(setLoading(false))
        }
    }
}
//
// export const changeCardPackTitleTC = (packId: string, newTitle: string) => {
//     return (dispatch: Dispatch) => {
//         try {
//             packsApi.editPack(packId, newTitle)
//                 .then((data) => {
//                     dispatch(changeCardPackTitle(data.updatedCardsPack._id, data.updatedCardsPack.name))
//                 })
//         } catch (e) {
//             console.log(e);
//         }
//     }
// }

