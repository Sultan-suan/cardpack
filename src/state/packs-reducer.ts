import {Dispatch} from "redux";
import { packsApi} from "../api/api";
import {CardsPacksType, NewCardPackType, ResponseCardsPackType} from "../types/types";


type InitStateType = {
    cardsPacks: CardsPacksType[]
    // newPack?: AddNewCardPacksActionType
}
let initialState: InitStateType = {
    cardsPacks: [],
    // newPack: {} as AddNewCardPacksActionType
}
type ActionType = SetCardPacksActionType | DeleteCardPacksActionType |AddNewCardPacksActionType

export type SetCardPacksActionType = {
    type: 'packs/SET_CARD_PACKS';
    data: CardsPacksType[];
}

export  type AddNewCardPacksActionType = {
    type: 'packs/ADD_NEW_CARD_PACK';
    newPack: CardsPacksType
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
            const newCardPack = {
                name: "no Name", // если не отправить будет таким
                path: "/def", // если не отправить будет такой
                grade: 0, // не обязателен
                shots: 0, // не обязателен
                rating: 0, // не обязателен
                deckCover: "url or base64", // не обязателен
                private: false, // если не отправить будет такой
                type: "pack" // если не отправить будет таким
            }
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
                    console.log(data)
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

export const addNewCardPackTC = (newPack: CardsPacksType) => {
    return (dispatch: Dispatch) => {
        try {
            packsApi.addPack(newPack)
                .then((data) => {
                   dispatch(addNewCardPacks(newPack))
                    console.log(newPack)
                })
        } catch (e) {
            console.log(e);
        }
    }
}

