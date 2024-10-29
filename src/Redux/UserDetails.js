import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userData : []
}

const UserDetails = createSlice({
  name: 'UserDetails',
  initialState,
  reducers: {
    SET_USER_DATA: (state,action) => {
      state.userData = action.payload;
    },
    CLEAR_USER_DATA: (state)=>{
        state.userData = []
    }
  },
});

export const { SET_USER_DATA,CLEAR_USER_DATA } = UserDetails.actions;
export default UserDetails.reducer;