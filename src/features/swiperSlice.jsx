import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, options, addDetail } from "./commonSlice";

export const fetchTopRated = createAsyncThunk(
  "popularMovies/fetchTopRated",
  async () => {
    const response = await fetch(`${BASE_URL}/movie/top_rated`, options).then(
      (response) => response.json()
    );
    return response;
  }
);
export const fetchTrending = createAsyncThunk(
  "movies/fetchTrending",
  async () => {
    const response = await fetch(`${BASE_URL}/trending/all/day`, options).then(
      (response) => response.json()
    );
    return response;
  }
);
export const fetchUpcoming = createAsyncThunk(
  "movies/fetchUpcoming",
  async () => {
    const response = await fetch(`${BASE_URL}/movie/upcoming`, options).then(
      (response) => response.json()
    );
    return response;
  }
);
export const fetchSimilar = createAsyncThunk(
  "movies/fetchSimilar",
  async (object) => {
    const response = await fetch(
      `${BASE_URL}/${object.type}/${object.id}/similar`,
      options
    ).then((response) => response.json());
    return response;
  }
);
export const fetchRecommended = createAsyncThunk(
  "movies/fetchRecommended",
  async (object) => {
    const response = await fetch(
      `${BASE_URL}/${object.type}/${object.id}/recommendations`,
      options
    ).then((response) => response.json());
    return response;
  }
);

let initialState = {
  trending: {},
  topRated: {},
  upcoming: {},
  similar: {},
  recommended: {},
};
const SwiperSlide = createSlice({
  name: "swiper",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrending.fulfilled, (state, { payload }) => {
        return addDetail(state, payload, "trending");
      })
      .addCase(fetchTopRated.fulfilled, (state, { payload }) => {
        return addDetail(state, payload, "topRated");
      })
      .addCase(fetchUpcoming.fulfilled, (state, { payload }) => {
        return addDetail(state, payload, "upcoming");
      })
      .addCase(fetchSimilar.fulfilled, (state, { payload }) => {
        return addDetail(state, payload, "similar");
      })
      .addCase(fetchRecommended.fulfilled, (state, { payload }) => {
        return addDetail(state, payload, "recommended");
      });
  },
});

export default SwiperSlide.reducer;
