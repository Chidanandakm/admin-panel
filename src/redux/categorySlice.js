import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from './userSlice';

const initialState = {
    loading: false,
    category: {},
    categories: {},
    error: null,
};

export const getCategories = createAsyncThunk('category/getCategories', async (data, { rejectWithValue }) => {
    try {
        return await API.get('/category');
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

export const getCategory = createAsyncThunk('category/getCategory', async (data, { rejectWithValue }) => {
    try {
        return await API.get(`/category/${data}`);
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

export const createCategory = createAsyncThunk('category/createCategory', async (data, { rejectWithValue }) => {
    try {
        return await API.post('/category/create', data);
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

export const updateCategory = createAsyncThunk('category/updateCategory', async (data, { rejectWithValue }) => {
    try {
        return await API.put(`/category/${data.id}`, data);
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

export const deleteCategory = createAsyncThunk('category/deleteCategory', async (data, { rejectWithValue }) => {
    try {
        return await API.delete(`/category/${data}`);
    } catch (error) {
        return rejectWithValue(error.response);
    }
});




const categorySlice = createSlice({
    name: 'category',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [getCategories.pending]: (state, action) => {
            state.loading = true;
        },
        [getCategories.fulfilled]: (state, action) => {
            state.categories = action.payload.data;
            state.loading = false;
        },
        [getCategories.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getCategory.pending]: (state, action) => {
            state.loading = true;
        },
        [getCategory.fulfilled]: (state, action) => {
            state.category = action.payload.data;
            state.loading = false;
        },
        [getCategory.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [createCategory.pending]: (state, action) => {
            state.loading = true;
        },
        [createCategory.fulfilled]: (state, action) => {
            state.categories = action.payload.data;
            state.loading = false;
        },
        [createCategory.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [updateCategory.pending]: (state, action) => {
            state.loading = true;
        },
        [updateCategory.fulfilled]: (state, action) => {
            state.category = action.payload.data;
            state.loading = false;
        },
        [updateCategory.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [deleteCategory.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteCategory.fulfilled]: (state, action) => {
            state.category = action.payload.data;
            state.loading = false;
        },
        [deleteCategory.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});


export default categorySlice.reducer;