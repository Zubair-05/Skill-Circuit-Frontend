import {configureStore} from '@reduxjs/toolkit';
import courseReducer from './features/courseSlice.js';
import videoReducer from './features/videoSlice.js';
import userReducer from './features/userSlice.js';
import cartReducer from './features/cartSlice.js';
import authReducer from './features/authSlice.js';
const store = configureStore({
    reducer: {
        course: courseReducer,
        video:videoReducer,
        user: userReducer,
        cart: cartReducer,
        auth: authReducer,
    },
})

export default store;