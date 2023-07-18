type setSearchParams = {
    type: 'SET_SEARCH_CARD_PARAMS'
}

type CardSearchReducerType = {
    question: string,
    answer: string
}

const initialCardSearchState: CardSearchReducerType = {
    question: "",
    answer: ""
}

export const cardSearchReducer = (state: CardSearchReducerType = initialCardSearchState, action: setSearchParams) => {
    switch (action.type) {
        case 'SET_SEARCH_CARD_PARAMS':
            return {...state}
        default:
            return state
    }
}