export type ResponseCardsPackType = {
    cardPacks: CardsPacksType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token?: string
    tokenDeathTime?: number
}
export type CardsPacksType = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}

export type NewCardPackType = {
    name: string // если не отправить будет таким
    path: string // если не отправить будет такой
    grade: number // не обязателен
    shots: number // не обязателен
    rating: number // не обязателен
    deckCover: string // не обязателен
    private: boolean // если не отправить будет такой
    type: string // если не отправить будет таким
}

