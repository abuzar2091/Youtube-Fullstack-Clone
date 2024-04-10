import {createSlice} from '@reduxjs/toolkit'

const initialState={
    status:false,      //user authenticated nhi h abhi 
    loggedInUser:null,      //user data nhi h abhi  
}
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            console.log("sotre ",action);
            state.status=true;
            state.loggedInUser=action.payload.loggedInUser;
        },
        logout:(state)=>{
            state.status=false;
            state.loggedInUser=null;
        },
        // setUserData: (state, action) => {
        //     state.userData = action.payload.userData;
        //   }
    }
});
export const {login,logout}=authSlice.actions;
export default authSlice.reducer;                       