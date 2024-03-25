import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, options, addDetail } from "./commonSlice";

export const fetchPopularMovies = createAsyncThunk(
  "popularMovies/fetchPopularMovies",
  async () => {
    try {
      const response = await fetch(`${BASE_URL}/movie/popular`, options).then(
        (response) => response.json()
      );
      return response;
    } catch (error) {
      alert(
        "Movie data is not accessible on mobile data. For the best experience, please connect to a Wi-Fi network to access the content."
      );
    }
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
