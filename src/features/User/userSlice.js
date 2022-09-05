import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setUserName:(state,action)=>{
            state.userName = action.payload;
            localStorage.setItem('userName', action.payload);
        },
        logout:(state)=>{
            state.userName=null;
            localStorage.removeItem('userName');
        }
    }
})

export const {setUserName,logout} = userSlice.actions;

export const selectUser = (state) => state.user.userName;

export default userSlice.reducer;