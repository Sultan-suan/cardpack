export const getPackId = () => {
    const data = localStorage.getItem('pack')
    console.log(data)
    return data ? data : ''
}
export const getPackUserId = () => {
    const data = localStorage.getItem('packUserId')
    console.log(data)
    return data ? data : ''
}

