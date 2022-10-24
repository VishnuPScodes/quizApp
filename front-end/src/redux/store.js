

import {legacy_createStore} from 'redux'
import { authReducer } from './reducer';

export const store=legacy_createStore(authReducer);

console.log(store.getState());

store.subscribe(()=>{
    console.log(store.getState());
})
