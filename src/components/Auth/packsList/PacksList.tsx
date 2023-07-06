import React from 'react';
import s from './PacksList.module.css'
import {CardsPacksType} from "../../../types/types";
import {changeDateFormat} from "../../../helpers/helpers";

type PacksListType = {
    packs: CardsPacksType[],
    userId: string
}

const PacksList = (props: PacksListType) => {

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
            <table className={s.wrapper}>
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
                                {
                                    el.user_id === props.userId && <>
                                        <button className={s.deleteButton}>delete</button>
                                        <button className={s.editButton}>edit</button>
                                    </>
                                }
                                <button className={s.learnButton}>learn</button>
                            </div>
                        </div>
                    })}
                </div>
            </table>
        </div>
    );
};

export default PacksList;