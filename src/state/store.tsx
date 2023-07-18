import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk'
import {authReducer} from "./auth-reducer";
import {searchReducer} from "./search-reducer";
import {packsReducer} from "./packs-reducer";
import {PackSearchReducer} from "./pack-search-reducer";
import {cardSearchReducer} from "./searchCard-reducer";


const rootReducer = combineReducers({
    auth: authReducer,
    search: searchReducer,
    packsReducer: packsReducer,
    PackSearchReducer: PackSearchReducer,
    cardReducer: cardSearchReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;