import { configureStore } from '@reduxjs/toolkit';
import propertyReducer from './features/propertySlice';
import rentRequestReducer from './features/rentRequestsSlice';
import joinRequestReducer from './features/joinRequestsSlice';
import contractReducer from './features/contractSlice';
import joinPostReducer from './features/joinPostSlice';

export const store = configureStore({
  reducer: {
    property: propertyReducer,
    rentRequest: rentRequestReducer,
    joinRequest: joinRequestReducer,
    contract: contractReducer,
    joinPost: joinPostReducer,
  },
});
