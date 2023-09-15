

type ActionsType =
    | ReturnType<typeof getCardName>
    | ReturnType<typeof setPageNumber>
    | ReturnType<typeof setPageCountNumber>
    | ReturnType<typeof setMinMaxCards>
    | ReturnType<typeof setShowAllCards>
    | ReturnType<typeof setSortCards>
    // | ReturnType<typeof setObject>


export type SearchCardsParamsStateType = {
    cardAnswer: string,
    cardQuestion: string,
    min: number
    max: number
    page: number
    pageCount: number
    cardsPack_id: string
    packName: string
    sortCards: string
}

const initialSearchState: SearchCardsParamsStateType = {
    cardAnswer: '',
    cardQuestion: '',
    min: 0,
    max: 25,
    page: 1,
    pageCount: 8,
    cardsPack_id: "",
    packName: "",
    sortCards: ''
}
export const cardSearchReducer = (state: SearchCardsParamsStateType = initialSearchState, action: ActionsType): SearchCardsParamsStateType => {
    switch (action.type) {
        case 'GET_CARDS_BY_SEARCH':
            return {...state, packName: action.cardName}
        case 'SET_PAGE_NUMBER':
            return {...state, page: action.page}
        case 'SET_PAGE_COUNT_NUMBER':
            return {...state, pageCount: action.pageCount}
        case 'SET_MIN_MAX_CARDS':
            return {...state, min: action.min, max: action.max}
        case 'SET_ALL_CARDS':
            return {...state, cardsPack_id: action.cardsPack_id}
        case 'SET_SORT_CARDS':
            return {...state, sortCards: action.sortBy}
        // case 'SET_OBJECT': {
        //     return {
        //         ...state,
        //          min:action.filter
        //     }
        // }

        default:
            return state
    }
}

export const getCardName = (cardName: string) => ({
    type: 'GET_CARDS_BY_SEARCH' as const, cardName
})
export const setPageNumber = (page: number) => ({
    type: 'SET_PAGE_NUMBER' as const, page
})
export const setPageCountNumber = (pageCount: number) => ({
    type: 'SET_PAGE_COUNT_NUMBER' as const, pageCount
})
export const setMinMaxCards = (min: number, max: number) => ({
    type: 'SET_MIN_MAX_CARDS' as const, min, max
})
export const setShowAllCards = (cardsPack_id: string) => ({
    type: 'SET_ALL_CARDS' as const, cardsPack_id
})
export const setSortCards = (sortBy: string) => ({
    type: 'SET_SORT_CARDS' as const, sortBy
})
//
// export const setObject = (filter: any) => ({
//     type: 'SET_OBJECT', filter
// })



