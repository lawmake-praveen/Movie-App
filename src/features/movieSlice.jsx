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

export const fetchAllMovies = createAsyncThunk(
  "movies/fetchAllMovies",
  async (object) => {
    const response = await fetch(
      `${BASE_URL}/discover/movie?language=en-US&page=${object.page}&sort_by=${object.value}`,
      options
    ).then((response) => response.json());
    return response;
  }
);
export const fetchAllTvShows = createAsyncThunk(
  "movies/fetchAllTvShows",
  async (value) => {
    const response = await fetch(
      `${BASE_URL}/discover/tv?page=1&sort_by=${value}`,
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
export const searchMovie = createAsyncThunk(
  "movies/searchMovie",
  async (searchInput) => {
    const response = await fetch(
      `${BASE_URL}/search/multi?query=${searchInput}`,
      options
    ).then((response) => response.json());
    return response;
  }
);
export const fetchSelectedMovie = createAsyncThunk(
  "movies/fetchSelectedMovie",
  async (id) => {
    const response = await fetch(`${BASE_URL}/movie/${id}`, options).then(
      (response) => response.json()
    );
    return response;
  }
);
export const fetchSelectedMovieVideos = createAsyncThunk(
  "movies/fetchSelectedMovieVideos",
  async (id) => {
    const response = await fetch(
      `${BASE_URL}/movie/${id}/videos`,
      options
    ).then((response) => response.json());
    return response;
  }
);

let initialState = {
  allMovies: [],
  allTvShows: {},
  addedMovies: {},
  trending: {},
  popularMovies: {},
  topRatedMovies: {},
  upcomingMovies: {},
  selectedMovie: {},
  selectedMovieVideos: {},
  searchMovie: {},
  searchInput: "",
  currentPage: "All",
  currentMovieSortType: "popularity.desc",
};

const MovieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    searchInputUpdate: (state, { payload }) => {
      state.searchInput = payload;
    },
    clearSelectedMovie: (state, { payload }) => {
      state.selectedMovie = {};
    },
    pageChange: (state, { payload }) => {
      state.currentPage = payload;
    },
    changeMovieSortType: (state, { payload }) => {
      state.currentMovieSortType = payload;
    },
    addMovies: (state, { payload }) => {
      state.allMovies = [...state.allMovies, ...payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMovies.fulfilled, (state, { payload }) => {
        return { ...state, allMovies: payload.results };
      })
      .addCase(fetchAllTvShows.fulfilled, (state, { payload }) => {
        return { ...state, allTvShows: payload };
      })
      .addCase(fetchPopularMovies.fulfilled, (state, { payload }) => {
        return { ...state, popularMovies: payload };
      })
      .addCase(fetchTrendingMovie.fulfilled, (state, { payload }) => {
        return { ...state, trending: payload };
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, { payload }) => {
        return { ...state, topRatedMovies: payload };
      })
      .addCase(fetchUpcomingMovie.fulfilled, (state, { payload }) => {
        return { ...state, upcomingMovies: payload };
      })
      .addCase(searchMovie.fulfilled, (state, { payload }) => {
        return { ...state, searchMovie: payload };
      })
      .addCase(fetchSelectedMovie.fulfilled, (state, { payload }) => {
        return { ...state, selectedMovie: payload };
      })
      .addCase(fetchSelectedMovieVideos.fulfilled, (state, { payload }) => {
        return { ...state, selectedMovieVideos: payload };
      });
  },
});

export default MovieSlice.reducer;
export const {
  searchInputUpdate,
  clearSelectedMovie,
  pageChange,
  changeMovieSortType,
  addMovies,
} = MovieSlice.actions;
