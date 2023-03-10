import { legacy_createStore } from "redux";
import { authReducer } from "./reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "auth",
    "token",
    "userId",
    "besttime",
  ],
};

const persistedReducer = persistReducer(persistConfig, authReducer);
export const store = legacy_createStore(persistedReducer);
export const persistor = persistStore(store);
console.log(store.getState());

store.subscribe(() => {
  console.log(store.getState());
});
