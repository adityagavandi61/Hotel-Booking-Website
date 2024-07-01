import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/counter';

export default configureStore({
  reducer: {
    reducer:counterReducer, 
  },
})