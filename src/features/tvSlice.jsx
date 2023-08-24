import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, options, addDetail } from "./commonSlice";

export const fetchPopularTv = createAsyncThunk(
  "popularMovies/fetchPopularTv",
  async () => {
    const response = await fetch(`${BASE_URL}/tv/popular`, options).then(
      (response) => response.json()
    );
    return response;
  }
);

let initialState = {
  popularTv: {},
};

const TvSlice = createSlice({
  name: "tv",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPopularTv.fulfilled, (state, { payload }) => {
      return addDetail(state, payload, "popularTv");
    });
  },
});

export default TvSlice.reducer;
