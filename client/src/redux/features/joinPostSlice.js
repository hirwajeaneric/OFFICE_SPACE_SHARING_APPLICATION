import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { APIS } from '../../utils/APIS';

const initialState = {
    listOfJoinPosts: [],
    selectedJoinPost: {},
    isLoading: false,
    isProcessing: false,
}

export const getJoinPosts = createAsyncThunk(
    'joinPost/getJoinPosts',
    async (userId, thunkAPI) => {
        try {
            const response = await axios.get(APIS.joinPostApis.list);
            response.data.joinPost.forEach(element => {
                element.id = element._id;
            });
            thunkAPI.dispatch({ type: 'joinPost/getJoinPostsStatistics', payload: { user: userId, joinPosts: response.data.joinPosts} });
            return response.data.joinPosts; 
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!');
        }
    }
);

export const getJoinPostDetails = createAsyncThunk(
    'joinPost/getJoinPostDetails',
    async (joinPostId, thunkAPI) => {
        try {
            const response = await axios.get(APIS.joinPostApis.findById+joinPostId);    
            return response.data.joinPost; 
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!');
        }
    }
);

export const getJoinPostByPropertyId = createAsyncThunk(
    'joinPost/getJoinPostByPropertyId',
    async (propertyId, thunkAPI) => {
        try {
            const response = await axios.get(APIS.joinPostApis.findByPropertyId+propertyId);    
            return response.data.joinPost; 
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!');
        }
    }
);

export const updateJoinPost = createAsyncThunk(
    'joinPost/updateJoinPost',
    async ( update, thunkAPI) => {
        try {
            const { id, joinPost } = update;
            var response = await axios.put(APIS.joinPostApis.update+id, joinPost);
            thunkAPI.dispatch({ type: 'joinPost/updateSelectedJoinPost', payload: response.data.joinPost });
            thunkAPI.dispatch(getJoinPosts());
            return response.data.joinPost; 
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!');
        }
    }
);

const joinPostSlice = createSlice({
    name: 'joinPost',
    initialState,
    reducers: {
        updateSelectedJoinPost: (state, action) => {
            state.selectedJoinPost = action.payload.joinPost;
        }
    },
    extraReducers: {
        [getJoinPosts.pending] : (state)=> {
            state.isLoading = true;
        },
        [getJoinPosts.fulfilled] : (state,action) => {
            state.isLoading = false;
        },
        [getJoinPosts.rejected] : (state) => {
            state.isLoading = false;
        },
        [getJoinPostDetails.pending] : (state)=> {
            state.isLoading = true;
        },
        [getJoinPostDetails.fulfilled] : (state,action) => {
            state.isLoading = false;
            state.selectedJoinPost = action.payload;
        },
        [getJoinPostDetails.rejected] : (state) => {
            state.isLoading = false;
        },
        [getJoinPostByPropertyId.pending] : (state)=> {
            state.isLoading = true;
        },
        [getJoinPostByPropertyId.fulfilled] : (state,action) => {
            state.isLoading = false;
            state.selectedJoinPost = action.payload;
        },
        [getJoinPostByPropertyId.rejected] : (state) => {
            state.isLoading = false;
        },
        [updateJoinPost.pending] : (state)=> {
            state.isProcessing = true;
        },
        [updateJoinPost.fulfilled] : (state,action) => {
            state.isProcessing = false;
        },
        [updateJoinPost.rejected] : (state) => {
            state.isProcessing = false;
        }
    }
});

export const { 
    updateSelectedJoinPost,
} = joinPostSlice.actions;
export default joinPostSlice.reducer;