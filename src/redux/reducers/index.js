import { combineReducers } from '@reduxjs/toolkit';
import audioReducer from './audioReducer'; 

const rootReducer = combineReducers({
  audio: audioReducer,
  
});

export default rootReducer;
