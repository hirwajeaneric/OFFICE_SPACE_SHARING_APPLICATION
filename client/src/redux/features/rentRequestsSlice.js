import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { APIS } from '../../utils/APIS';

const initialState = {
    listOfRentRequestsSentToMe: [],
    numberOfRentRequestsSentToMe: 0,
    listOfRentRequestsSentByMe: [],
    numberOfRentRequestsSentByMe: 0,
    selectedRentRequest: {},
    recentRentRequests: [],
    isLoading: false,
    isProcessing: false,
}

export const getRentRequests = createAsyncThunk(
    'rentRequest/getRentRequests',
    async (userId, thunkAPI) => {
        try {
            const response = await axios.get(APIS.rentRequestApis.list);
            response.data.rentRequests.forEach(element => {
                element.id = element._id;
            });
            thunkAPI.dispatch({ type: 'rentRequest/getRentRequestsStatistics', payload: { user: userId, rentRequests: response.data.rentRequests } });
            return response.data.rentRequests; 
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!');
        }
    }
);

export const getRentRequestDetails = createAsyncThunk(
    'rentRequest/getRentRequestDetails',
    async (rentRequestId, thunkAPI) => {
        try {
            const response = await axios.get(APIS.rentRequestApis.findById+rentRequestId);    
            return response.data.rentRequest; 
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!');
        }
    }
);

export const updateRentRequest = createAsyncThunk(
    'rentRequest/updateRentRequest',
    async ( update, thunkAPI) => {
        try {
            const { id, rentRequest } = update;
            var response = await axios.put(APIS.rentRequestApis.update+id, rentRequest);
            thunkAPI.dispatch({ type: 'rentRequest/updateSelectedRentRequest', payload: response.data.rentRequest });
            thunkAPI.dispatch(getRentRequests());
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
        },
        getRentRequestsStatistics: (state, action) => {
            let requestsToMyProperties = [];
            let requestsSentByMe = [];
            action.payload.rentRequests.forEach(element => {
                if (element.propertyOwnerId === action.payload.user) {
                    requestsToMyProperties.push(element);
                }
                if (element.requestingUserId === action.payload.user) {
                    requestsSentByMe.push(element);
                }
            });
            state.listOfRentRequestsSentToMe = requestsToMyProperties;
            state.numberOfRentRequestsSentToMe = requestsToMyProperties.length;
            state.listOfRentRequestsSentByMe = requestsSentByMe;
            state.numberOfRentRequestsSentByMe = requestsSentByMe.length;
        }
    },
    extraReducers: {
        [getRentRequests.pending] : (state)=> {
            state.isLoading = true;
        },
        [getRentRequests.fulfilled] : (state,action) => {
            state.isLoading = false;
            state.listOfRentRequests = action.payload;
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
        },
        [updateRentRequest.pending] : (state)=> {
            state.isProcessing = true;
        },
        [updateRentRequest.fulfilled] : (state,action) => {
            state.isProcessing = false;
        },
        [updateRentRequest.rejected] : (state) => {
            state.isProcessing = false;
        }
    }
});

export const { 
    updateSelectedRentRequest,
    getRentRequestsStatistics
} = rentRequestSlice.actions;
export default rentRequestSlice.reducer;