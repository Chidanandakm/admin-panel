import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const API = axios.create({ baseURL: "https://admin-app-bakend.herokuapp.com/" });

API.interceptors.request.use((request) => {
    request.headers.Authorization = `Bearer ${localStorage.getItem(
        "token",
    )}`
    return request
})

const initialState = {
    loading: false,
    isLoggedIn: localStorage.getItem("token") ? true : false,
    users: {},
    user: {},
    regUser: {},
    delUser: {},
    userById: {},
    updateUser: {},
    error: null,
}

export const getUsers = createAsyncThunk('account/getUsers', async (data, { rejectWithValue }) => {
    try {
        return await API.get('/users');

    } catch (error) {
        return rejectWithValue(error.response);

    }
})

export const getUser = createAsyncThunk('account/getUser', async (data, { rejectWithValue }) => {
    try {
        return await API.get(`/users/${data}`);


    } catch (error) {
        return rejectWithValue(error.response);

    }
})

export const updateUser = createAsyncThunk('account/updateUser', async (data, { rejectWithValue }) => {
    try {
        return await API.patch(`/users/${data.id}`, data);

    } catch (error) {
        return rejectWithValue(error.response);

    }
})

export const userLogin = createAsyncThunk('account/userLogin', async (data, { rejectWithValue }) => {
    try {
        return await API.post(`/users/login`, data);

    } catch (error) {
        return rejectWithValue(error.response);

    }
})

export const logout = createAsyncThunk('account/logout', async (data, { rejectWithValue }) => {
    localStorage.clear();
    return true

})

export const createUser = createAsyncThunk('account/createUser', async (data, { rejectWithValue }) => {
    try {
        return await API.post(`/users/register`, data);

    } catch (error) {
        return rejectWithValue(error.response);

    }
})

export const deleteUser = createAsyncThunk('account/deleteUser', async (data, { rejectWithValue }) => {
    try {
        return await API.delete(`/users/${data}`);

    } catch (error) {
        return rejectWithValue(error.response);

    }
})

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {},
    middleware: [],
    extraReducers: {
        [getUsers.pending]: (state, action) => {
            state.loading = true;
        },
        [getUsers.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = action.payload.data;
        },
        [getUsers.rejected]: (state, action) => {
            state.loading = false;
        },

        [createUser.pending]: (state, action) => {
            state.loading = true;
        },
        [createUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.regUser = action.payload.data;
        },
        [createUser.rejected]: (state, action) => {
            state.loading = false;

        },

        [getUser.pending]: (state, action) => {
            state.loading = true;
        },
        [getUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.userById = action.payload.data;
        },
        [getUser.rejected]: (state, action) => {
            state.loading = false;
        },

        [userLogin.pending]: (state, action) => {
            state.loading = true;
        },
        [userLogin.fulfilled]: (state, action) => {
            state.loading = false;
            state.isLoggedIn = true;
            state.user = action.payload.data.user;
        },
        [userLogin.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.data;
        },

        [logout.pending]: (state, action) => {
            state.loading = true;
        },
        [logout.fulfilled]: (state, action) => {
            state.loading = false;
            state.isLoggedIn = false;
            state.user = {};
            state.error = null;
        },
        [logout.rejected]: (state, action) => {
            state.loading = false;
        },

        [deleteUser.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.delUser = action.payload.data;
        },
        [deleteUser.rejected]: (state, action) => {
            state.loading = false;
        },

        [updateUser.pending]: (state, action) => {
            state.loading = true;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.updateUser = action.payload.data;
        },
        [updateUser.rejected]: (state, action) => {
            state.loading = false;
        }






    }

})

export default userSlice.reducer;