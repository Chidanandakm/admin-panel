import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from './userSlice';


const initialState = {
    loading: false,
    articles: {},
    article: {},
    error: null,
}

export const getArticles = createAsyncThunk('article/getArticles', async (data, { rejectWithValue }) => {
    try {
        return await API.get('/articles');
    } catch (error) {
        return rejectWithValue(error.response);
    }
})

export const getArticle = createAsyncThunk('article/getArticle', async (data, { rejectWithValue }) => {
    try {
        return await API.get(`/articles/${data}`);
    } catch (error) {
        return rejectWithValue(error.response);
    }
})

export const createArticle = createAsyncThunk('article/createArticle', async (data, { rejectWithValue }) => {
    try {
        return await API.post('/articles/create', data);
    } catch (error) {
        return rejectWithValue(error.response);
    }
})

export const updateArticle = createAsyncThunk('article/updateArticle', async (data, { rejectWithValue }) => {
    try {
        return await API.put(`/articles/${data.id}`, data);
    } catch (error) {
        return rejectWithValue(error.response);
    }
})

export const deleteArticle = createAsyncThunk('article/deleteArticle', async (data, { rejectWithValue }) => {
    try {
        return await API.delete(`/articles/${data}`);
    } catch (error) {
        return rejectWithValue(error.response);
    }
})



const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {},
    extraReducers: {
        [getArticles.pending]: (state, action) => {
            state.loading = true;
        },
        [getArticles.fulfilled]: (state, action) => {
            state.loading = false;
            state.articles = action.payload.data;
        },
        [getArticles.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getArticle.pending]: (state, action) => {
            state.loading = true;
        },
        [getArticle.fulfilled]: (state, action) => {
            state.loading = false;
            state.article = action.payload.data;
        },
        [getArticle.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [createArticle.pending]: (state, action) => {
            state.loading = true;
        },
        [createArticle.fulfilled]: (state, action) => {
            state.loading = false;
            state.article = action.payload.data;
        },
        [createArticle.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [updateArticle.pending]: (state, action) => {
            state.loading = true;
        },
        [updateArticle.fulfilled]: (state, action) => {
            state.loading = false;
            state.article = action.payload.data;
        },
        [updateArticle.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [deleteArticle.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteArticle.fulfilled]: (state, action) => {
            state.loading = false;
            state.article = action.payload.data;
        },
        [deleteArticle.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export default articleSlice.reducer;