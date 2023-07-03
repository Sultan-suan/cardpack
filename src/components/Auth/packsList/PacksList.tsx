import React from 'react';
import s from './PacksList.module.css'

const PacksList = () => {
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
                    <div className={s.tr}>
                        <div className={s.td}>Marick</div>
                        <div className={s.td}>12345</div>
                        <div className={s.td}>03.09</div>
                        <div className={s.td}>Marick</div>
                        <div className={s.td}>Delete</div>
                    </div>
                    <div className={s.tr}>
                        <div className={s.td}>Dimych</div>
                        <div className={s.td}>11111</div>
                        <div className={s.td}>03.10</div>
                        <div className={s.td}>Dimych</div>
                        <div className={s.td}>Delete</div>
                    </div>
                    <div className={s.tr}>
                        <div className={s.td}>Dimych</div>
                        <div className={s.td}>11111</div>
                        <div className={s.td}>03.10</div>
                        <div className={s.td}>Dimych</div>
                        <div className={s.td}>Delete</div>
                    </div>
                    <div className={s.tr}>
                        <div className={s.td}>Dimych</div>
                        <div className={s.td}>11111</div>
                        <div className={s.td}>03.10</div>
                        <div className={s.td}>Dimych</div>
                        <div className={s.td}>Delete</div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PacksList;