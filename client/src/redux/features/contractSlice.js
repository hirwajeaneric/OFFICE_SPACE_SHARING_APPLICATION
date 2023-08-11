import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { APIS } from '../../utils/APIS';

const initialState = {
    listOfContracts: [],
    numberOfContracts: 0,
    selectedContract: {},
    isLoading: false,
    isProcessing: false,
}

export const getContracts = createAsyncThunk(
    'contract/getContracts',
    async (userId, thunkAPI) => {
        try {
            const response = await axios.get(APIS.contractApis.list);
            response.data.contracts.forEach(element => {
                element.id = element._id;
            });
            thunkAPI.dispatch({ type: 'contract/getContractsStatistics', payload: { user: userId, contracts: response.data.contracts} });
            return response.data.contracts; 
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!');
        }
    }
);

export const getContractDetails = createAsyncThunk(
    'contract/getContractDetails',
    async (contractId, thunkAPI) => {
        try {
            const response = await axios.get(APIS.contractApis.findById+contractId);    
            return response.data.contract; 
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!');
        }
    }
);

export const updateContract = createAsyncThunk(
    'contract/updateContract',
    async ( update, thunkAPI) => {
        try {
            const { id, contract } = update;
            var response = await axios.put(APIS.contractApis.update+id, contract);
            thunkAPI.dispatch({ type: 'contract/updateSelectedContract', payload: response.data.contract });
            thunkAPI.dispatch(getContracts());
            return response.data.contract; 
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!');
        }
    }
);

const contractSlice = createSlice({
    name: 'contract',
    initialState,
    reducers: {
        updateSelectedContract: (state, action) => {
            state.selectedContract = action.payload.contract;
        },
        getContractsStatistics: (state, action) => {
            let contractsForMyOwnProperties = [];
            let contractsForPropertiesIRent = [];
            action.payload.contracts.forEach(element => {
                if (element.ownerId === action.payload.user) {
                    contractsForMyOwnProperties.push(element);
                }
                element.tenants.forEach(tenant => {
                    if (tenant.tenantId === action.payload.user) {
                        contractsForPropertiesIRent.push(element);
                    }
                })
            });
            state.listOfContracts = contractsForMyOwnProperties.concat(contractsForPropertiesIRent);
            state.numberOfContracts = contractsForMyOwnProperties.length + contractsForPropertiesIRent.length;
        }
    },
    extraReducers: {
        [getContracts.pending] : (state)=> {
            state.isLoading = true;
        },
        [getContracts.fulfilled] : (state,action) => {
            state.isLoading = false;
        },
        [getContracts.rejected] : (state) => {
            state.isLoading = false;
        },
        [getContractDetails.pending] : (state)=> {
            state.isLoading = true;
        },
        [getContractDetails.fulfilled] : (state,action) => {
            state.isLoading = false;
            state.selectedContract = action.payload;
        },
        [getContractDetails.rejected] : (state) => {
            state.isLoading = false;
        },
        [updateContract.pending] : (state)=> {
            state.isProcessing = true;
        },
        [updateContract.fulfilled] : (state,action) => {
            state.isProcessing = false;
        },
        [updateContract.rejected] : (state) => {
            state.isProcessing = false;
        }
    }
});

export const { 
    updateSelectedContract,
    getContractsStatistics
} = contractSlice.actions;
export default contractSlice.reducer;