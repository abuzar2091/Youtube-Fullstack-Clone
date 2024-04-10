import {createSlice} from '@reduxjs/toolkit'

const initialState={
    popoverVisible :false,     
           
}
const uploadVideo=createSlice({
    name:"popover",
    initialState,
    reducers:{
        setPopoverVisibility:(state,actin)=>{
            state.popoverVisible = !state.popoverVisible;
        },
       
    }
});
export const {setPopoverVisibility}=uploadVideo.actions;
export default uploadVideo.reducer;