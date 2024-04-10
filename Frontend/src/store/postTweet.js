import {createSlice} from '@reduxjs/toolkit'

const initialState={
    tweetPopoverVisible :false,     
           
}
const postTweet=createSlice({
    name:"tweetPopover",
    initialState,
    reducers:{
        setTweetPopoverVisibility:(state,actin)=>{
            state.tweetPopoverVisible  = !state.tweetPopoverVisible;
        },
    }
});
export const {setTweetPopoverVisibility}=postTweet.actions;
export default postTweet.reducer;