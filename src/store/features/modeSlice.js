import { createSlice } from '@reduxjs/toolkit';


export const modeSlice = createSlice({
    name: 'mode',
    initialState:{
        mode:'student',
    },
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload;
        },
        toggleMode: (state, action) => {
            state.mode = action.payload;
        }
    },
});

export const { setMode, toggleMode } = modeSlice.actions;

export default modeSlice.reducer;
