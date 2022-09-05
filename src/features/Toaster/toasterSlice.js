import { createSlice } from "@reduxjs/toolkit";

const toasterSlice = createSlice({
    name:"toaster",
    initialState:{
        ToasterOpen:false,
        ToasterType: "success",
        ToasterMessage: ""
    },
    reducers:{
        setToast:(state,action)=>{
            state.ToasterMessage=action.payload.ToasterMessage;
            state.ToasterOpen = action.payload.ToasterOpen;
            state.ToasterType = action.payload.ToasterType;
        },
        showSuccessToast:(state,action)=>{
            debugger;
            state.ToasterMessage=action.payload;
            state.ToasterOpen = true;
            state.ToasterType = "success";
        },
        showErrorToast:(state,action)=>{
            state.ToasterMessage=action.payload;
            state.ToasterOpen = true;
            state.ToasterType = "error";
        },
        showWarningToast:(state,action)=>{
            state.ToasterMessage=action.payload;
            state.ToasterOpen = true;
            state.ToasterType = "warning";
        },
        showInfoToast:(state,action)=>{
            state.ToasterMessage=action.payload;
            state.ToasterOpen = true;
            state.ToasterType = "info";
        },
        closeToast:(state)=>{
            state.ToasterOpen = false;
        }
    }
})

export const {setToast,showErrorToast,showInfoToast,showSuccessToast,showWarningToast,closeToast} = toasterSlice.actions;

export const selectToasterOpen = (state)=>state.toaster.ToasterOpen;
export const selectToasterType = (state)=>state.toaster.ToasterType;
export const selectToasterMessage = (state)=>state.toaster.ToasterMessage;

export default toasterSlice.reducer;
