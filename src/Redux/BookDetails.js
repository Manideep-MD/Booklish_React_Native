import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bookData : []
}

const BookDetails = createSlice({
  name: 'BookDetails',
  initialState,
  reducers: {
    SET_BOOK_DATA: (state,action) => {
      state.bookData = action.payload;
    },
  },
});

export const { SET_BOOK_DATA } = BookDetails.actions;
export default BookDetails.reducer;