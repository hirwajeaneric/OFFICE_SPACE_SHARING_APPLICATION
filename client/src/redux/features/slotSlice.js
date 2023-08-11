import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    slotsForOfficeSpace: [],
    numberOfSlotsForOfficeSpace: 0,
    selectedSlot: {},

    availableSlots: [],
    numberOfAvailableSlots: 0,
    bookedSlots: [],
    numberOfBookedSlots: 0,
    unavailableSlots: [],
    numberOfUnavailableSlots: 0,

    isLoading: false,
    searchQuery: {},
    searchResults: [],
}

export const getSlotsForOfficeSpace = createAsyncThunk(
    'slot/getSlotsForOfficeSpace',
    async (filter, thunkAPI) => {
        const { spaceId } = filter;
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/slot/findBySpaceId?spaceId=${spaceId}`);
            response.data.slots.forEach(element => {
                element.id = element._id;
            });
            return response.data.slots; 
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!');
        }
    }
);

export const getSlotDetails = createAsyncThunk(
    'slot/getSlotDetails',
    async (filter, thunkAPI) => {
        const { slotId } = filter;
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVERURL}/api/v1/ossa/slot/findById?id=${slotId}`);    
            return response.data.slot; 
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!');
        }
    }
);

const slotSlice = createSlice({
    name: 'slot',
    initialState,
    reducers: {
        updateSelectedSlot: (state, action) => {
            state.selectedSlot = action.payload.slot;
        },
        searchSlot: (state, action) => {
            const { slotType, status, location } = action.payload;
            state.searchQuery = action.payload;
            let searchResults = null;

            var slots = state.listOfSlots.filter((slot) => slot.status !== 'Occupied');

            if (!slotType && !status && !location) {
                searchResults = slots.filter((slot) => slot.status !== 'Occupied')
            } else if (slotType && status && location) {
                searchResults = slots.filter((slot) => slot.slotType !== action.payload.slotType && slot.status !== action.payload.status && !slot.location.includes(action.payload.location))
            } else if (!slotType && status && !location) {
                searchResults = slots.filter((slot) => slot.status === action.payload.status)
            } else if (!slotType && !status && location) {
                searchResults = slots.filter((slot) => slot.location.includes(action.payload.location))
            } else if (slotType && !status && !location) {
                searchResults = slots.filter((slot) => slot.slotType === action.payload.slotType)
            } else if (slotType && !status && location) {
                searchResults = slots.filter((slot) => slot.slotType !== action.payload.slotType && !slot.location.includes(action.payload.location))
            } else if (!slotType && status && location) {
                searchResults = slots.filter((slot) => slot.status === action.payload.status && slot.location.includes(action.payload.location))
            } else if (slotType && status && !location) {
                searchResults = slots.filter((slot) => slot.slotType !== action.payload.slotType && slot.status !== action.payload.status)
            } 
            
            state.searchResults = searchResults;
        }
    },
    extraReducers: {
        [getSlotsForOfficeSpace.pending] : (state)=> {
            state.isLoading = true;
        },
        [getSlotsForOfficeSpace.fulfilled] : (state,action) => {
            state.isLoading = false;
            state.slotsForOfficeSpace = action.payload;
            state.numberOfSlotsForOfficeSpace = action.payload.length;

            state.availableSlots = action.payload.filter(element => element.status === 'available');
            state.numberOfAvailableSlots = state.availableSlots.length;

            state.bookedSlots = action.payload.filter(element => element.status === 'booked');
            state.numberOfBookedSlots = state.bookedSlots.length;

            state.unavailableSlots = action.payload.filter(element => element.status === 'unavailable');
            state.numberOfUnavailableSlots = state.unavailableSlots.length;
        },
        [getSlotsForOfficeSpace.rejected] : (state) => {
            state.isLoading = false;
        },
        [getSlotDetails.pending] : (state)=> {
            state.isLoading = true;
        },
        [getSlotDetails.fulfilled] : (state,action) => {
            state.isLoading = false;
            state.selectedSlot = action.payload;
        },
        [getSlotDetails.rejected] : (state) => {
            state.isLoading = false;
        }
    }
});

export const { 
    updateSelectedSlot,
    searchSlot,
} = slotSlice.actions;
export default slotSlice.reducer;