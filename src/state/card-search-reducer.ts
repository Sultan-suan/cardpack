

type ActionsType =
    | ReturnType<typeof setCardsPageNumber>
    | ReturnType<typeof setCardsPageCountNumber>
    | ReturnType<typeof setMinMaxCards>
    | ReturnType<typeof setCardsPackId>
    | ReturnType<typeof setSortCards>
    // | ReturnType<typeof setObject>


export type SearchCardsParamsStateType = {
    cardAnswer: string,
    cardQuestion: string,
    min: number
    max: number
    page: number
    pageCount: number
    // cardsPack_id: string
    sortCards: string
}

const initialSearchState: SearchCardsParamsStateType = {
    cardAnswer: '',
    cardQuestion: '',
    min: 0,
    max: 25,
    page: 1,
    pageCount: 4,
    // cardsPack_id: "",
    sortCards: ''
};

export const cardsSearchReducer = (state: SearchCardsParamsStateType = initialSearchState, action: ActionsType): SearchCardsParamsStateType => {
    switch (action.type) {

        case 'SET_PAGE_NUMBER':
            return {...state, page: action.page};
        case 'SET_PAGE_COUNT_NUMBER':
            return {...state, pageCount: action.pageCount};
        case 'SET_MIN_MAX_CARDS':
            return {...state, min: action.min, max: action.max};
        // case 'SET_CARDS_PACK_ID':
        //     return {...state, cardsPack_id: action.cardsPack_id};
        case 'SET_SORT_CARDS':
            return {...state, sortCards: action.sortBy};
        // case 'SET_OBJECT': {
        //     return {
        //         ...state,
        //          min:action.filter
        //     }
        // }

        default:
            return state
    }
};

export const setCardsPageNumber = (page: number) => ({
    type: 'SET_PAGE_NUMBER' as const, page
});
export const setCardsPageCountNumber = (pageCount: number) => ({
    type: 'SET_PAGE_COUNT_NUMBER' as const, pageCount
});
export const setMinMaxCards = (min: number, max: number) => ({
    type: 'SET_MIN_MAX_CARDS' as const, min, max
});
export const setCardsPackId = (cardsPack_id: string) => ({
    type: 'SET_CARDS_PACK_ID' as const, cardsPack_id
});
export const setSortCards = (sortBy: string) => ({
    type: 'SET_SORT_CARDS' as const, sortBy
});
//
// export const setObject = (filter: any) => ({
//     type: 'SET_OBJECT', filter
// })



