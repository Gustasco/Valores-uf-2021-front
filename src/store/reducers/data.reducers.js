import { createReducer } from '@reduxjs/toolkit';
import dataActions from '../actions/data.actions';

const { getAllData, createData, deleteData, updateData } = dataActions;

const initialState = {
    data: [],
    message: '',
};

const dataReducers = createReducer(initialState, (builder) => {
    builder
        .addCase(getAllData.fulfilled, (state, action) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
        })
        .addCase(createData.fulfilled, (state, action) => {
            state.data.push(action.payload.data);
            state.message = action.payload.message;
        })
        .addCase(updateData.fulfilled, (state, action) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
        })
        .addCase(deleteData.fulfilled, (state, action) => {
            const deletedDataId = action.payload.data;
            state.data = state.data.filter((data) => data.id !== deletedDataId);
            state.message = action.payload.message;
        });
});

export default dataReducers;
