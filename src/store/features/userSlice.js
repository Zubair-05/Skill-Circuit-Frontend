import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: '',
        userName: '',
        email: '',
    },
    reducers:{
        setUserDetails : (state, action) => {
            state.userId = action.payload;
        }
    }
})

export const {setUserDetails} = userSlice.actions;
export default userSlice.reducer;