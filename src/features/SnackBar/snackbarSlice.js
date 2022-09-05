import { createSlice } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
    name:"snackbar",
    initialState:{
        snackbarOpen:false,
        snackbarType: "success",
        snackbarMessage: ""
    },
    reducers:{
        setSnackbar:(state,action)=>{
            state.snackbarMessage=action.payload.snackbarMessage;
            state.snackbarOpen = action.payload.snackbarOpen;
            state.snackbarType = action.payload.snackbarType;
        },
        showSuccessSnackbar:(state,action)=>{
            state.snackbarMessage=action.payload;
            state.snackbarOpen = true;
            state.snackbarType = "success";
        },
        showErrorSnackbar:(state,action)=>{
            state.snackbarMessage=action.payload;
            state.snackbarOpen = true;
            state.snackbarType = "error";
        },
        showWarningSnackbar:(state,action)=>{
            state.snackbarMessage=action.payload;
            state.snackbarOpen = true;
            state.snackbarType = "warning";
        },
        showInfoSnackbar:(state,action)=>{
            state.snackbarMessage=action.payload;
            state.snackbarOpen = true;
            state.snackbarType = "info";
        },
        closeSnackbar:(state)=>{
            state.snackbarOpen = false;
        }
    }
})

export const {setSnackbar,showErrorSnackbar,showInfoSnackbar,showSuccessSnackbar,showWarningSnackbar,closeSnackbar} = snackbarSlice.actions;

export const selectSnackbarOpen = (state)=>state.snackbar.snackbarOpen;
export const selectSnackbarType = (state)=>state.snackbar.snackbarType;
export const selectSnackbarMessage = (state)=>state.snackbar.snackbarMessage;

export default snackbarSlice.reducer;

