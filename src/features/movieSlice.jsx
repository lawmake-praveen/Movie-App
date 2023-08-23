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
export const fetchTopRatedMovies = createAsyncThunk(
  "popularMovies/fetchTopRatedMovies",
  async () => {
    const response = await fetch(`${BASE_URL}/movie/top_rated`, options).then(
      (response) => response.json()
    );
    return response;
  }
);
export const fetchTrendingMovie = createAsyncThunk(
  "movies/fetchTrendingMovie",
  async () => {
    const response = await fetch(`${BASE_URL}/trending/all/day`, options).then(
      (response) => response.json()
    );
    return response;
  }
);
export const fetchUpcomingMovie = createAsyncThunk(
  "movies/fetchUpcomingMovie",
  async () => {
    const response = await fetch(`${BASE_URL}/movie/upcoming`, options).then(
      (response) => response.json()
    );
    return response;
  }
);
export const fetchSearchMovie = createAsyncThunk(
  "movies/fetchSearchMovie",
  async (object) => {
    const response = await fetch(
      `${BASE_URL}/search/multi?query=${object.searchInput}&page=${object.page}`,
      options
    ).then((response) => response.json());
    return response;
  }
);
export const fetchSelectedMovie = createAsyncThunk(
  "movies/fetchSelectedMovie",
  async (object) => {
    try {
      const response = await fetch(
        `${BASE_URL}/${object.type}/${object.id}`,
        options
      ).then((response) => {
        if (!response.ok) {
          throw new Error("No Details");
        }
        return response.json();
      });
      return response;
    } catch (error) {
      window.alert("Details For this movie is not updated");
    }
  }
);
export const fetchSelectedMovieVideos = createAsyncThunk(
  "movies/fetchSelectedMovieVideos",
  async (object) => {
    const response = await fetch(
      `${BASE_URL}/${object.type}/${object.id}/videos`,
      options
    ).then((response) => response.json());
    return response;
  }
);
export const fetchSelectedMovieCredits = createAsyncThunk(
  "movies/fetchSelectedMovieCredits",
  async (object) => {
    const response = await fetch(
      `${BASE_URL}/${object.type}/${object.id}/credits`,
      options
    ).then((response) => response.json());
    return response;
  }
);
export const fetchSimilarMovies = createAsyncThunk(
  "movies/fetchSimilarMovies",
  async (object) => {
    const response = await fetch(
      `${BASE_URL}/${object.type}/${object.id}/similar`,
      options
    ).then((response) => response.json());
    return response;
  }
);
export const fetchRecommendedMovies = createAsyncThunk(
  "movies/fetchRecommendedMovies",
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
  topRatedMovies: {},
  upcomingMovies: {},
  selectedMovie: {},
  selectedMovieVideos: {},
  selectedMovieCredits: {},
  similarMovies: {},
  recommendedMovies: {},
  searchMovie: [],
  personDetails: {},
};

const clearDetails =
  (selection) =>
  (state, { payload }) => {
    if (selection == "selectedMovie" || selection == "personDetails") {
      state[selection] = payload ? payload : {};
    } else if (selection == "explore" || selection == "searchMovie") {
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
    clearSelectedMovie: clearDetails("selectedMovie"),
    clearExplore: clearDetails("explore"),
    clearSearchMovie: clearDetails("searchMovie"),
    clearPersonDetails: clearDetails("personDetails"),
    changeMovieSortType: (state, { payload }) => {
      state.currentMovieSortType = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.fulfilled, (state, { payload }) => {
        return addDetail(state, payload, "popularMovies");
      })
      .addCase(fetchTrendingMovie.fulfilled, (state, { payload }) => {
        return addDetail(state, payload, "trending");
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, { payload }) => {
        return addDetail(state, payload, "topRatedMovies");
      })
      .addCase(fetchUpcomingMovie.fulfilled, (state, { payload }) => {
        return addDetail(state, payload, "upcomingMovies");
      })
      .addCase(fetchSelectedMovie.fulfilled, (state, { payload }) => {
        return addDetail(state, payload, "selectedMovie");
      })
      .addCase(fetchSelectedMovieVideos.fulfilled, (state, { payload }) => {
        return addDetail(state, payload, "selectedMovieVideos");
      })
      .addCase(fetchSelectedMovieCredits.fulfilled, (state, { payload }) => {
        return addDetail(state, payload, "selectedMovieCredits");
      })
      .addCase(fetchSimilarMovies.fulfilled, (state, { payload }) => {
        return addDetail(state, payload, "similarMovies");
      })
      .addCase(fetchRecommendedMovies.fulfilled, (state, { payload }) => {
        return addDetail(state, payload, "recommendedMovies");
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
      .addCase(fetchSearchMovie.fulfilled, (state, { payload }) => {
        if (state.searchMovie?.length > 0) {
          if (
            Array.isArray(payload?.results) &&
            state.searchMovie[0]?.id !== payload?.results[0]?.id
          ) {
            return {
              ...state,
              searchMovie: [...state.searchMovie, ...payload?.results],
            };
          }
        } else {
          return {
            ...state,
            searchMovie: [...state.searchMovie, ...payload?.results],
          };
        }
      });
  },
});

export default MovieSlice.reducer;
export const {
  clearSelectedMovie,
  changeMovieSortType,
  clearExplore,
  clearSearchMovie,
  clearPersonDetails,
} = MovieSlice.actions;
