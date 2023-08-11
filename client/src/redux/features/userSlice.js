import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    selectedUser: {},
    isLoading: false,
    isProcessing: false,
}

export const getUserDetails = createAsyncThunk(
    'user/getUserDetails',
    async (filter, thunkAPI) => {
        const { userId } = filter;
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/user/findById?id=${userId}`);    
            return response.data.user; 
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!');
        }
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateSelectedUser: (state, action) => {
            state.selectedUser = action.payload.user;
        }
    },
    extraReducers: {
        [getUserDetails.pending] : (state)=> {
            state.isLoading = true;
        },
        [getUserDetails.fulfilled] : (state,action) => {
            state.isLoading = false;
            state.selectedUser = action.payload;
        },
        [getUserDetails.rejected] : (state) => {
            state.isLoading = false;
        },
    }
});

export const { updateSelectedUser } = userSlice.actions;
export default userSlice.reducer;