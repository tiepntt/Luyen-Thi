import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
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
const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});
export type RootState = ReturnType<typeof RootReducer>;
const pReducer = persistReducer<RootState>(persistConfig, RootReducer as any);
const middlewares = [logger];
export const store = createStore(
  pReducer,
  composeEnhancers(
    applyMiddleware(...middlewares)
    // other store enhancers if any
  )
);
export const persistor = persistStore(store);
