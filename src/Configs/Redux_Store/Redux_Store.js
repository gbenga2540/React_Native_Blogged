// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import rootReducer from '../../Redux/Reducers/Reducers';

// const persistConfig = {
//     key: 'Blogged_Storage',
//     storage: AsyncStorage,
//     blacklist: []
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer);
// const store = configureStore({ reducer: persistedReducer, middleware: [] });
// const persistedStore = persistStore(store);

// export default store;
// export { persistedStore };

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../Redux/Reducers/Reducers';

const store = configureStore({ reducer: rootReducer, middleware: [] });

export default store;
