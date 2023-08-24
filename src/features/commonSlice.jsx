import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
  },
};

export const BASE_URL = "https://api.themoviedb.org/3";

export const fetchExplore = createAsyncThunk(
  "movies/fetchExplore",
  async (object) => {
    const response = await fetch(
      `${BASE_URL}/discover/${object.type}?language=en-US&page=${object.page}&sort_by=popularity.desc`,
      options
    ).then((response) => response.json());
    return response;
  }
);
export const fetchSearch = createAsyncThunk(
  "movies/fetchSearch",
  async (object) => {
    const response = await fetch(
      `${BASE_URL}/search/multi?query=${object.searchInput}&page=${object.page}`,
      options
    ).then((response) => response.json());
    return response;
  }
);

let initialState = {
  explore: [],
  search: [],
};

export const clearDetails =
  (selection, empty) =>
  (state, { payload }) => {
    state[selection] = payload ? payload : empty;
  };

export const addDetail = (state, payload, selection) => {
  return { ...state, [selection]: payload };
};

const MovieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    clearExplore: clearDetails("explore", []),
    clearSearch: clearDetails("search", []),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExplore.fulfilled, (state, { payload }) => {
        if (state.explore.length > 0) {
          if (state?.explore[0]?.id !== payload?.results[0]?.id) {
            return {
              ...state,
              explore: [...state?.explore, ...payload?.results],
            };
          }
        } else {
          return {
            ...state,
            explore: [...state?.explore, ...payload?.results],
          };
        }
      })
      .addCase(fetchSearch.fulfilled, (state, { payload }) => {
        const filtered = payload.results?.filter(
          (item) => !item.known_for_department
        );
        if (state.search?.length > 0) {
          if (state.search[0]?.id !== filtered[0]?.id) {
            return {
              ...state,
              search: [...state.search, ...filtered],
            };
          }
        } else {
          return {
            ...state,
            search: [...state.search, ...filtered],
          };
        }
      });
  },
});

export default MovieSlice.reducer;
export const { clearExplore, clearSearch } = MovieSlice.actions;
