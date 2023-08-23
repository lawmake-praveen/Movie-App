import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDA1Y2I0ZDY5ZmE5OTg1ZjJlZjBkZTEwYWZjZWRhMiIsInN1YiI6IjY0YzRhODRkY2FkYjZiMDBlNzVjODZjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._ctFLh0sU0Bbr0fMeuSE1Gl130BMhqodXBh9eUS5fPg",
  },
};

const BASE_URL = "https://api.themoviedb.org/3";

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
export const fetchPopularMovies = createAsyncThunk(
  "popularMovies/fetchPopularMovies",
  async () => {
    const response = await fetch(`${BASE_URL}/movie/popular`, options).then(
      (response) => response.json()
    );
    return response;
  }
);
export const fetchPopularTv = createAsyncThunk(
  "popularMovies/fetchPopularTv",
  async () => {
    const response = await fetch(`${BASE_URL}/tv/popular`, options).then(
      (response) => response.json()
    );
    return response;
  }
);
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
export const fetchSelected = createAsyncThunk(
  "movies/fetchSelected",
  async (object) => {
    const response = await fetch(
      `${BASE_URL}/${object.type}/${object.id}`,
      options
    ).then((response) => response.json());
    return response;
  }
);
export const fetchSelectedVideos = createAsyncThunk(
  "movies/fetchSelectedVideos",
  async (object) => {
    const response = await fetch(
      `${BASE_URL}/${object.type}/${object.id}/videos`,
      options
    ).then((response) => response.json());
    return response;
  }
);
export const fetchSelectedCredits = createAsyncThunk(
  "movies/fetchSelectedCredits",
  async (object) => {
    const response = await fetch(
      `${BASE_URL}/${object.type}/${object.id}/credits`,
      options
    ).then((response) => response.json());
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
export const fetchPerson = createAsyncThunk(
  "movies/fetchPerson",
  async (id) => {
    const response = await fetch(`${BASE_URL}/person/${id}?`, options).then(
      (response) => response.json()
    );
    return response;
  }
);

let initialState = {
  explore: [],
  trending: {},
  popularMovies: {},
  popularTv: {},
  topRated: {},
  upcoming: {},
  similar: {},
  recommended: {},
  selected: {},
  selectedVideos: {},
  selectedCredits: {},
  search: [],
  personDetails: {},
};

const clearDetails =
  (selection) =>
  (state, { payload }) => {
    if (selection == "selected" || selection == "personDetails") {
      state[selection] = payload ? payload : {};
    } else if (selection == "explore" || selection == "search") {
      state[selection] = payload ? payload : [];
    }
  };

const addDetail = (state, payload, selection) => {
  return { ...state, [selection]: payload };
};

const MovieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    clearSelected: clearDetails("selected"),
    clearExplore: clearDetails("explore"),
    clearSearch: clearDetails("search"),
    clearPersonDetails: clearDetails("personDetails"),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.fulfilled, (state, { payload }) => {
        return addDetail(state, payload, "popularMovies");
      })
      .addCase(fetchPopularTv.fulfilled, (state, { payload }) => {
        return addDetail(state, payload, "popularTv");
      })
      .addCase(fetchTrending.fulfilled, (state, { payload }) => {
        return addDetail(state, payload, "trending");
      })
      .addCase(fetchTopRated.fulfilled, (state, { payload }) => {
        return addDetail(state, payload, "topRated");
      })
      .addCase(fetchUpcoming.fulfilled, (state, { payload }) => {
        return addDetail(state, payload, "upcoming");
      })
      .addCase(fetchSelected.fulfilled, (state, { payload }) => {
        return addDetail(state, payload, "selected");
      })
      .addCase(fetchSelectedVideos.fulfilled, (state, { payload }) => {
        return addDetail(state, payload, "selectedVideos");
      })
      .addCase(fetchSelectedCredits.fulfilled, (state, { payload }) => {
        return addDetail(state, payload, "selectedCredits");
      })
      .addCase(fetchSimilar.fulfilled, (state, { payload }) => {
        return addDetail(state, payload, "similar");
      })
      .addCase(fetchRecommended.fulfilled, (state, { payload }) => {
        return addDetail(state, payload, "recommended");
      })
      .addCase(fetchPerson.fulfilled, (state, { payload }) => {
        return addDetail(state, payload, "personDetails");
      })
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
        if (state.search?.length > 0) {
          if (
            Array.isArray(payload?.results) &&
            state.search[0]?.id !== payload?.results[0]?.id
          ) {
            return {
              ...state,
              search: [...state.search, ...payload?.results],
            };
          }
        } else {
          return {
            ...state,
            search: [...state.search, ...payload?.results],
          };
        }
      });
  },
});

export default MovieSlice.reducer;
export const { clearSelected, clearExplore, clearSearch, clearPersonDetails } =
  MovieSlice.actions;
