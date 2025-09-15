import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
  PersistConfig,
} from 'redux-persist';
import authReducer from './slices/authSlice';
import matterReducer from './slices/matterSlice';

// Define the root state type before using it
export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

const persistedConfig: PersistConfig<RootState> = {
  key: 'party-invitation',
  storage: AsyncStorage,
  blacklist: [] as string[],
};

const reducers = combineReducers({
  auth: authReducer,
  matter: matterReducer,
});

const persistedStore = persistReducer(persistedConfig, reducers);

export const store = configureStore({
  reducer: persistedStore,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
