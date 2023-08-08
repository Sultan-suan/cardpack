type SetSearchActionType = ReturnType <typeof setCardPageActionType> |  ReturnType <typeof getCardBySearchActionType> |  ReturnType <typeof setCardPageCountActionType>


export type SearchActionType = {
    packQuestion: string,
    packName: string,
    min: number,
    max: number,
    sortPacks?: string,
    page?: number,
    pageCount?: number
}

const initialSearchState: SearchActionType = {
    packQuestion: "",
    packName: "",
    min: 0,
    max: 10,
    page: 1,
    pageCount: 8
}

export const searchReducer = (state: SearchActionType = initialSearchState, action: SetSearchActionType): SearchActionType => {
    switch (action.type) {
        case 'GET_CARD_BY_SEARCH':
            return {...state, packQuestion: action.packQuestion}
        case 'SET_CARD_PAGE_NUMBER':
            return {...state, pageCount: action.pageCount}
        case 'SET_PAGE_NUMBER':
            return {...state, page: action.page}
        default:
            return state
    }
}

export const setCardPageActionType = (page: number) => ({
    type: 'SET_PAGE_NUMBER' as const, page: page
})

export const getCardBySearchActionType  = (packQuestion: string) => ({
    type: 'GET_CARD_BY_SEARCH' as const, packQuestion: packQuestion
})

export const setCardPageCountActionType = (pageCount: number) => ({
    type: 'SET_CARD_PAGE_NUMBER' as const, pageCount: pageCount
})