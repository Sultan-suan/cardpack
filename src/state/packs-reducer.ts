import {Dispatch} from "redux";
import { packsApi} from "../api/api";
import {CardsPacksType, ResponseCardsPackType} from "../types/types";


type InitStateType = {
    cardsPacks: CardsPacksType[]
}
let initialState: InitStateType = {
    cardsPacks: [],
}
type ActionType = SetCardPacksActionType

export type SetCardPacksActionType = {
    type: 'packs/SET_CARD_PACKS';
    data: CardsPacksType[];
}

const SET_CARD_PACKS = 'packs/SET_CARD_PACKS'

export const packsReducer = (state: InitStateType = initialState, action: ActionType): InitStateType => {
    switch (action.type) {
        case SET_CARD_PACKS: {
            return {
                ...state,
                cardsPacks: action.data
            }
        }

        default:
            return state
    }
}

export const setCardPacks = (data: CardsPacksType[]): SetCardPacksActionType => ({
    type: SET_CARD_PACKS, data
})

export const getCardPacksTC = () => {
    return (dispatch: Dispatch) => {
        try {
            packsApi.get()
                .then((data) => {
                    console.log(data)
                    dispatch(setCardPacks(data.cardPacks))
                })
        } catch (e) {
            console.log(e);
        }
    }
}
