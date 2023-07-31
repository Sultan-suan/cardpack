type ActionsType =
    | ReturnType<typeof getPacksBySearch>
    | ReturnType<typeof setPageNumber>
    | ReturnType<typeof setPageCountNumber>
    | ReturnType<typeof setMinMaxPacks>
    | ReturnType<typeof setShowAllPacks>


export type SearchParamsStateType = {
    packName: string,
    min: number,
    max: number,
    page: number,
    pageCount?: number,
    user_id: string
}

const initialSearchState: SearchParamsStateType = {
    packName: "",
    min: 0,
    max: 25,
    page: 1,
    pageCount: 8,
    user_id: ""
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
            return {...state, min: action.min, max: action.max}
        case 'SET_ALL_PACKS':
            return {...state, user_id: action.userId}
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