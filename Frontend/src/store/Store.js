import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice';
import uploadVideo from './uploadVideo';
import postTweet from './postTweet';

const store=configureStore({
    reducer:{
       auth: authSlice,
       popover:uploadVideo,
       tweetPopover:postTweet,
        //...otherReducers
  
    }
})
export default store;