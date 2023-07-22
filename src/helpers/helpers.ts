
export function changeDateFormat(date: string) {
    let n = 0
    let arr = date.split('')
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 'T') {
            n = arr.indexOf('T')
        }
    }
    let dateTilDay = date.split('')
        .filter((l, i) => i < n)
        .map(e => e === '-' ? '.' : e).join('')
        .split('.')
    let reverseDate = [dateTilDay[0], dateTilDay[1], dateTilDay[2]] = [dateTilDay[2], dateTilDay[1], dateTilDay[0]]
    return reverseDate.join('.')
}

export function objectToString(obj: any) {
    return Object.entries(obj).map(ar => ar.join('=')).join('&')
}

let user_id = 'user_id=639d91d96e80bf001ed7c478'
