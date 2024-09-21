import {configureStore} from '@reduxjs/toolkit';
import courseReducer from './features/courseSlice.js';
import videoReducer from './features/videoSlice.js';

const store = configureStore({
    reducer: {
        course: courseReducer,
        video:videoReducer
    },
})

export default store;