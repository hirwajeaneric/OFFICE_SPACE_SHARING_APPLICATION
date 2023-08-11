import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    listOfOfficeSpaces: [],
    numberOfOfficeSpaces: 0,
    selectedOfficeSpace: {},
    
    locationsOfAvailableOfficeSpaces: [],

    ownedOfficeSpaces: [],
    numberOfOwnedOfficeSpaces: 0,
    
    isLoading: false,
    searchQuery: {},
    searchResults: [],
}

export const getOfficeSpaces = createAsyncThunk(
    'officeSpace/getOfficeSpaces',
    async (thunkAPI) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/officeSpace/list`);
            response.data.officeSpaces.forEach(element => {
                element.id = element._id;
            });
            return response.data.officeSpaces; 
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!');
        }
    }
);

export const getOwnedOfficeSpaces = createAsyncThunk(
    'officeSpace/getOwnedOfficeSpaces',
    async (filter, thunkAPI) => {
        const { ownerId } = filter;
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/officeSpace/findByOwnerId?ownerId=${ownerId}`);
            response.data.officeSpaces.forEach(element => {
                element.id = element._id;
                element.lastUpdated = new Date(element.lastUpdated).toDateString()
            });
            return response.data.officeSpaces; 
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!');
        }
    }
);

export const getOfficeSpaceDetails = createAsyncThunk(
    'officeSpace/getOfficeSpaceDetails',
    async (filter, thunkAPI) => {
        const { officeSpaceId } = filter;
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/officeSpace/findById?id=${officeSpaceId}`);    
            return response.data.officeSpace; 
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!');
        }
    }
);

const getUniqueLocations = (officeSpaces) => {
    const uniqueLocations = new Set();
    officeSpaces.forEach((officeSpace) => {
      uniqueLocations.add(officeSpace.location);
    });
    return Array.from(uniqueLocations);
};

const officeSpaceSlice = createSlice({
    name: 'officeSpace',
    initialState,
    reducers: {
        updateSelectedOfficeSpace: (state, action) => {
            state.selectedOfficeSpace = action.payload.officeSpace;
        },
        searchOfficeSpace: (state, action) => {
            const { officeSpaceType, status, location } = action.payload;
            state.searchQuery = action.payload;
            let searchResults = null;

            var officeSpaces = state.listOfOfficeSpaces.filter((officeSpace) => officeSpace.status !== 'Occupied');

            if (!officeSpaceType && !status && !location) {
                searchResults = officeSpaces.filter((officeSpace) => officeSpace.status !== 'Occupied')
            } else if (officeSpaceType && status && location) {
                searchResults = officeSpaces.filter((officeSpace) => officeSpace.officeSpaceType !== action.payload.officeSpaceType && officeSpace.status !== action.payload.status && !officeSpace.location.includes(action.payload.location))
            } else if (!officeSpaceType && status && !location) {
                searchResults = officeSpaces.filter((officeSpace) => officeSpace.status === action.payload.status)
            } else if (!officeSpaceType && !status && location) {
                searchResults = officeSpaces.filter((officeSpace) => officeSpace.location.includes(action.payload.location))
            } else if (officeSpaceType && !status && !location) {
                searchResults = officeSpaces.filter((officeSpace) => officeSpace.officeSpaceType === action.payload.officeSpaceType)
            } else if (officeSpaceType && !status && location) {
                searchResults = officeSpaces.filter((officeSpace) => officeSpace.officeSpaceType !== action.payload.officeSpaceType && !officeSpace.location.includes(action.payload.location))
            } else if (!officeSpaceType && status && location) {
                searchResults = officeSpaces.filter((officeSpace) => officeSpace.status === action.payload.status && officeSpace.location.includes(action.payload.location))
            } else if (officeSpaceType && status && !location) {
                searchResults = officeSpaces.filter((officeSpace) => officeSpace.officeSpaceType !== action.payload.officeSpaceType && officeSpace.status !== action.payload.status)
            } 
            
            state.searchResults = searchResults;
        }
    },
    extraReducers: {
        [getOfficeSpaces.pending] : (state)=> {
            state.isLoading = true;
        },
        [getOfficeSpaces.fulfilled] : (state,action) => {
            state.isLoading = false;
            state.listOfOfficeSpaces = action.payload;
            state.numberOfOfficeSpaces = action.payload.length;
            state.locationsOfAvailableOfficeSpaces = getUniqueLocations(action.payload);
        },
        [getOfficeSpaces.rejected] : (state) => {
            state.isLoading = false;
        },
        [getOfficeSpaceDetails.pending] : (state)=> {
            state.isLoading = true;
        },
        [getOfficeSpaceDetails.fulfilled] : (state,action) => {
            state.isLoading = false;
            state.selectedOfficeSpace = action.payload;
        },
        [getOfficeSpaceDetails.rejected] : (state) => {
            state.isLoading = false;
        },
        [getOwnedOfficeSpaces.pending] : (state)=> {
            state.isLoading = true;
        },
        [getOwnedOfficeSpaces.fulfilled] : (state,action) => {
            state.isLoading = false;
            state.ownedOfficeSpaces = action.payload;
            state.numberOfOwnedOfficeSpaces = action.payload.length;
        },
        [getOwnedOfficeSpaces.rejected] : (state) => {
            state.isLoading = false;
        },
    }
});

export const { 
    updateSelectedOfficeSpace,
    getRentedOfficeSpaces
} = officeSpaceSlice.actions;
export default officeSpaceSlice.reducer;