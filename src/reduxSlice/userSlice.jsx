import {createSlice} from "@reduxjs/toolkit";

const initialState = {user: null}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
  }
})

export const selectUser = (state) => state.user.user

export const {login, logout} = userSlice.actions

export default userSlice