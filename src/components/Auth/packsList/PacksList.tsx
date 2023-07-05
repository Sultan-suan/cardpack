import React from 'react';
import s from './PacksList.module.css'
import {CardsPacksType} from "../../../types/types";

type PacksListType = {
    packs: CardsPacksType[]
}

const PacksList = (props: PacksListType) => {
    function changeDateFormat(date: string) {
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

    changeDateFormat('2023-05-17T10:18:48.525Z')
    return (
        <div>
            <h1>Packs list</h1>
            <div className={s.header}>
                <div>
                    <input className={s.inputSearch} placeholder={'Search'} type="search"/>
                </div>
                <div>
                    <button className={s.button}>Add new pack</button>
                </div>
            </div>
            <div className={s.wrapper}>
                <div className={s.head}>
                    <div className={s.tr}>
                        <div className={s.th}>Name</div>
                        <div className={s.th}>Cards</div>
                        <div className={s.th}>Last updated</div>
                        <div className={s.th}>created by</div>
                        <div className={s.th}>Actions</div>
                    </div>
                </div>
                <div className={s.body}>
                    {props.packs.map(el => {
                        return <div className={s.tr} key={el.created}>
                            <div className={s.td}>{el.name}</div>
                            <div className={s.td}>{el.cardsCount}</div>
                            <div className={s.td}>{changeDateFormat(el.updated)}</div>
                            <div className={s.td}>{el.name}</div>
                            <div className={s.td}>
                                <button className={s.deleteButton}>delete</button>
                                <button className={s.editButton}>edit</button>
                                <button className={s.learnButton}>learn</button>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
};

export default PacksList;