import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, options, addDetail } from "./commonSlice";

export const fetchPopularMovies = createAsyncThunk(
  "popularMovies/fetchPopularMovies",
  async () => {
    const response = await fetch(`${BASE_URL}/movie/popular`, options).then(
      (response) => response.json()
    );
    return response;
  }
);

let initialState = {
  popularMovies: {},
};

const MovieSlice = createSlice({
  name: "movie",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPopularMovies.fulfilled, (state, { payload }) => {
      return addDetail(state, payload, "popularMovies");
    });
  },
});

export default MovieSlice.reducer;
