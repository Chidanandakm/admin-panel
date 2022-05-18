import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:5000/users";

const initialState = {
    loading: false,
    isLoggedIn: localStorage.getItem("token") ? true : false,
    users: {},
}

export const getUsers = createAsyncThunk('account/getUsers', async (data, { rejectWithValue }) => {
    try {
        return await axios.get(baseUrl);

    } catch (error) {
        return rejectWithValue(error.response);

    }
})

export const getUser = createAsyncThunk('account/getUser', async (data, { rejectWithValue }) => {
    try {
        return await axios.get(`${baseUrl}/${data}`);


    } catch (error) {
        return rejectWithValue(error.response);

    }
})

export const userLogin = createAsyncThunk('account/userLogin', async (data, { rejectWithValue }) => {
    try {
        return await axios.post(`${baseUrl}/login`, data);

    } catch (error) {
        return rejectWithValue(error.response);

    }
})

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {},
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

        [getUser.pending]: (state, action) => {
            state.loading = true;
        },
        [getUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = action.payload.data;
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
            localStorage.setItem("token", action.payload.data.token);
        },
        [userLogin.rejected]: (state, action) => {
            state.loading = false;
        },



    }

})

export default userSlice.reducer;