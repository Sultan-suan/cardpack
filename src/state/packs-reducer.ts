import {Dispatch} from "redux";
import {packsApi} from "../api/api";
import {CardsPacksType} from "../types/types";


type InitStateType = {
    cardsPacks: CardsPacksType[]
}
let initialState: InitStateType = {
    cardsPacks: [],
}
type ActionType = SetCardPacksActionType | DeleteCardPacksActionType | AddNewCardPacksActionType

export type SetCardPacksActionType = {
    type: 'packs/SET_CARD_PACKS';
    data: CardsPacksType[];
}

export  type AddNewCardPacksActionType = {
    type: 'packs/ADD_NEW_CARD_PACK';
    newPack: any
}

export type DeleteCardPacksActionType = {
    type: 'packs/DELETE_CARD_PACKS';
    packId: string;
}


const SET_CARD_PACKS = 'packs/SET_CARD_PACKS'
const DELETE_CARD_PACKS = 'packs/DELETE_CARD_PACKS'
const ADD_NEW_CARD_PACK = 'packs/ADD_NEW_CARD_PACK'

export const packsReducer = (state: InitStateType = initialState, action: ActionType): InitStateType => {
    switch (action.type) {
        case SET_CARD_PACKS: {
            return {
                ...state,
                cardsPacks: action.data
            }
        }
        case DELETE_CARD_PACKS: {
            return {
                cardsPacks: state.cardsPacks.filter(pack => pack._id != action.packId)
            }
        }
        case ADD_NEW_CARD_PACK: {
            // console.log(newCardPack)
            return {
                ...state,
                cardsPacks: [...state.cardsPacks, action.newPack]
            }
        }
        default:
            return state
    }
}

export const setCardPacks = (data: CardsPacksType[]): SetCardPacksActionType => ({
    type: SET_CARD_PACKS, data
})

export const deleteCardPack = (packId: string): DeleteCardPacksActionType => ({
    type: DELETE_CARD_PACKS, packId
})

export const addNewCardPacks = (newPack: CardsPacksType): AddNewCardPacksActionType => ({
    type: ADD_NEW_CARD_PACK, newPack
})


export const getCardPacksTC = () => {
    return (dispatch: Dispatch) => {
        try {
            packsApi.getPacks()
                .then((data) => {
                    dispatch(setCardPacks(data.cardPacks))
                })
        } catch (e) {
            console.log(e);
        }
    }
}

export const deleteCardPacksTC = (id: string) => {
    return (dispatch: Dispatch) => {
        try {
            packsApi.deletePack(id)
                .then((data) => {
                    dispatch(deleteCardPack(id))
                })
        } catch (e) {
            console.log(e);
        }
    }
}

export const addNewCardPackTC = (newPackName: string) => {
    return (dispatch: Dispatch) => {
        try {
            packsApi.addPack(newPackName)
                .then((data) => {
                    dispatch(addNewCardPacks(data.newCardsPack))
                })
        } catch (e) {
            console.log(e);
        }
    }
}

