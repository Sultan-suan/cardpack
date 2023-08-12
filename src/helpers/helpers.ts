import {SearchParamsStateType} from "../state/pack-search-reducer";

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

export type ObjectType = {[key: string]: string | number}

export function objectToString(obj: ObjectType) {
    return Object.entries(obj).map(ar => ar.join('=')).join('&')
}

export const options = [
    {value: 2, body: '2'},
    {value: 4, body: '4'},
    {value: 6, body: '6'},
    {value: 8, body: '8'}
]

