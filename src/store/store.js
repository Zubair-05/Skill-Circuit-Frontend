import {configureStore} from '@reduxjs/toolkit';
import courseReducer from './features/courseSlice.js';
import videoReducer from './features/videoSlice.js';
import userReducer from './features/userSlice.js';
import cartReducer from './features/cartSlice.js';
const store = configureStore({
    reducer: {
        course: courseReducer,
        video:videoReducer,
        user: userReducer,
        cart: cartReducer
    },
})

export default store;