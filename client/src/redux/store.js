import { configureStore } from '@reduxjs/toolkit';
import officeSpaceReducer from './features/officeSpaceSlice';
import rentRequestReducer from './features/rentRequestsSlice';
import slotReducer from './features/slotSlice';
import userReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    officeSpace: officeSpaceReducer,
    rentRequest: rentRequestReducer,
    slot: slotReducer,
    user: userReducer,
  },
});
