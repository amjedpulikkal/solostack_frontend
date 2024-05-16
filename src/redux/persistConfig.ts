import storage from 'redux-persist/lib/storage';
import { PersistConfig } from 'redux-persist/es/types';

const persistConfig: PersistConfig<any> = {
  key: 'root', 
  storage, 
  whitelist: ['author'], 
};

export default persistConfig;
