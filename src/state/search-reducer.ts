type SetSearchActionType = {
    type: 'SET_SEARCH',
    payload: SearchActionType
}
export type SearchActionType = {
    packName: string,
    min: number,
    max: number,
    sortPacks?: string,
    page?: number,
    pageCount?: number
}
type  SearchReducerStateType = {
    searchType: SearchActionType
}

const initialSearchState: SearchActionType = {
    packName: "",
    min: 0,
    max: 10
}

export const searchReducer = (state: SearchActionType = initialSearchState, action: SetSearchActionType): SearchActionType => {
    switch (action.type) {
        case 'SET_SEARCH':
            return {...state}
        default:
            return state
    }
}