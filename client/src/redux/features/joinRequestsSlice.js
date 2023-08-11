import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { APIS } from '../../utils/APIS';

const initialState = {
    listOfJoinRequestsSentToMe: [],
    numberOfJoinRequestsSentToMe: 0,
    listOfJoinRequestsSentByMe: [],
    numberOfJoinRequestsSentByMe: 0,
    selectedJoinRequest: {},
    recentJoinRequests: [],
    isLoading: false,
    isProcessing: false,
}

export const getJoinRequests = createAsyncThunk(
    'joinRequest/getJoinRequests',
    async (userId, thunkAPI) => {
        try {
            const response = await axios.get(APIS.joinRequestApis.list);
            response.data.joinRequests.forEach(element => {
                element.id = element._id;
            });
            thunkAPI.dispatch({ type: 'joinRequest/getJoinRequestsStatistics', payload: { user: userId, joinRequests: response.data.joinRequests } });
            return response.data.joinRequests; 
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!');
        }
    }
);

export const getJoinRequestDetails = createAsyncThunk(
    'joinRequest/getJoinRequestDetails',
    async (joinRequestId, thunkAPI) => {
        try {
            const response = await axios.get(APIS.joinRequestApis.findById+joinRequestId);    
            return response.data.joinRequest; 
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!');
        }
    }
);

export const updateJoinRequest = createAsyncThunk(
    'joinRequest/updateJoinRequest',
    async ( update, thunkAPI) => {
        try {
            const { id, joinRequest } = update;
            var response = await axios.put(APIS.joinRequestApis.update+id, joinRequest);
            thunkAPI.dispatch({ type: 'joinRequest/updateSelectedJoinRequest', payload: response.data.joinRequest });
            thunkAPI.dispatch(getJoinRequests());
            return response.data.joinRequest; 
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!');
        }
    }
);

const joinRequestSlice = createSlice({
    name: 'joinRequest',
    initialState,
    reducers: {
        updateSelectedJoinRequest: (state, action) => {
            state.selectedJoinRequest = action.payload.joinRequest;
        },
        getJoinRequestsStatistics: (state, action) => {
            let requestsToMyProperties = [];
            let requestsSentByMe = [];

            action.payload.joinRequests.forEach(element => {
                if (element.postingTenantId === action.payload.user) {
                    requestsToMyProperties.push(element);
                }
                if (element.postingTenantId === action.payload.user) {
                    requestsSentByMe.push(element);
                }
            })

            state.listOfJoinRequestsSentToMe = requestsToMyProperties;
            state.numberOfJoinRequestsSentToMe = requestsToMyProperties.length;
            state.listOfJoinRequestsSentByMe = requestsSentByMe;
            state.numberOfJoinRequestsSentByMe = requestsSentByMe.length;
        }
    },
    extraReducers: {
        [getJoinRequests.pending] : (state)=> {
            state.isLoading = true;
        },
        [getJoinRequests.fulfilled] : (state,action) => {
            state.isLoading = false;
            state.listOfJoinRequests = action.payload;
        },
        [getJoinRequests.rejected] : (state) => {
            state.isLoading = false;
        },
        [getJoinRequestDetails.pending] : (state)=> {
            state.isLoading = true;
        },
        [getJoinRequestDetails.fulfilled] : (state,action) => {
            state.isLoading = false;
            state.selectedJoinRequest = action.payload;
        },
        [getJoinRequestDetails.rejected] : (state) => {
            state.isLoading = false;
        },
        [updateJoinRequest.pending] : (state)=> {
            state.isProcessing = true;
        },
        [updateJoinRequest.fulfilled] : (state,action) => {
            state.isProcessing = false;
        },
        [updateJoinRequest.rejected] : (state) => {
            state.isProcessing = false;
        }
    }
});

export const { 
    updateSelectedJoinRequest,
    getJoinRequestsStatistics
} = joinRequestSlice.actions;
export default joinRequestSlice.reducer;