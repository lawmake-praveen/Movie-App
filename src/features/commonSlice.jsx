import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const KEY = import.meta.env.VITE_TOKEN;

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${KEY}`,
  },
};

export const BASE_URL = "https://api.themoviedb.org/3";

export const fetchExplore = createAsyncThunk(
  "movies/fetchExplore",
  async (object) => {
    try {
      const response = await fetch(
        `${BASE_URL}/discover/${object.type}?language=en-US&page=${object.page}&sort_by=popularity.desc`,
        options
      ).then((response) => response.json());
      return response;
    } catch (error) {
      alert(
        "Movie data is not accessible on mobile data. For the best experience, please connect to a Wi-Fi network to access the content."
      );
    }
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
