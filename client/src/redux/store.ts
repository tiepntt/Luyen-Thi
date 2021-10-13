import { applyMiddleware, combineReducers, createStore } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { logger } from "redux-logger";
import { UserReducer } from "./user/reducer";
import { CommonReducer } from "./common/reducer";
const RootReducer = combineReducers({
  UserReducer,
  CommonReducer,
});
const persistConfig = {
  key: "luyen-thi",
  storage,
};
export type RootState = ReturnType<typeof RootReducer>;
const pReducer = persistReducer<RootState>(persistConfig, RootReducer as any);
const middlewares = [logger];
export const store = createStore(pReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);
