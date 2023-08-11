import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    listOfRentRequestsSentToMe: [],
    numberOfRentRequestsSentToMe: 0,
    listOfRentRequestsSentByMe: [],
    numberOfRentRequestsSentByMe: 0,
    selectedRentRequest: {},
    recentRentRequests: [],
    numberOfRecentRentRequests: 0,
    isLoading: false,
    isProcessing: false,
}

export const getRentRequests = createAsyncThunk(
    'rentRequest/getRentRequests',
    async (filter, thunkAPI) => {
        const { userId } = filter;
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/rentRequest/list`);
            response.data.rentRequests.forEach(element => {
                element.id = element._id;
            });
            return {userId: userId, rentRequests: response.data.rentRequests}; 
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!');
        }
    }
);

export const getRentRequestDetails = createAsyncThunk(
    'rentRequest/getRentRequestDetails',
    async (filter, thunkAPI) => {
        const { rentRequestId } = filter;
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/rentRequest/findById?id=${rentRequestId}`);    
            return response.data.rentRequest; 
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!');
        }
    }
);


const rentRequestSlice = createSlice({
    name: 'rentRequest',
    initialState,
    reducers: {
        updateSelectedRentRequest: (state, action) => {
            state.selectedRentRequest = action.payload.rentRequest;
        }
    },
    extraReducers: {
        [getRentRequests.pending] : (state)=> {
            state.isLoading = true;
        },
        [getRentRequests.fulfilled] : (state,action) => {
            state.isLoading = false;
            const { userId, rentRequests } = action.payload;

            state.listOfRentRequests = rentRequestSlice;

            let requestsSentToMe = [];
            let requestsSentByMe = [];

            rentRequests.forEach(element => {
                if (element.officeSpaceOwnerId === userId) {
                    requestsSentToMe.push(element);
                }
                if (element.requestingUserId === userId) {
                    requestsSentByMe.push(element);
                }
            });

            state.listOfRentRequestsSentToMe = requestsSentToMe;
            state.numberOfRentRequestsSentToMe = requestsSentToMe.length;
            state.listOfRentRequestsSentByMe = requestsSentByMe;
            state.numberOfRentRequestsSentByMe = requestsSentByMe.length;
        },
        [getRentRequests.rejected] : (state) => {
            state.isLoading = false;
        },
        [getRentRequestDetails.pending] : (state)=> {
            state.isLoading = true;
        },
        [getRentRequestDetails.fulfilled] : (state,action) => {
            state.isLoading = false;
            state.selectedRentRequest = action.payload;
        },
        [getRentRequestDetails.rejected] : (state) => {
            state.isLoading = false;
        }
    }
});

export const { updateSelectedRentRequest } = rentRequestSlice.actions;
export default rentRequestSlice.reducer;