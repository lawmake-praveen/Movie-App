import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, options, addDetail, clearDetails } from "./commonSlice";

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
  selected: {},
  selectedVideos: {},
  selectedCredits: {},
  personDetails: {},
};
const SelectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    clearSelected: clearDetails("selected", {}),
    clearPersonDetails: clearDetails("personDetails", {}),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSelected.fulfilled, (state, { payload }) => {
        return addDetail(state, payload, "selected");
      })
      .addCase(fetchSelectedVideos.fulfilled, (state, { payload }) => {
        return addDetail(state, payload, "selectedVideos");
      })
      .addCase(fetchSelectedCredits.fulfilled, (state, { payload }) => {
        return addDetail(state, payload, "selectedCredits");
      })
      .addCase(fetchPerson.fulfilled, (state, { payload }) => {
        return addDetail(state, payload, "personDetails");
      });
  },
});

export default SelectedSlice.reducer;
export const { clearSelected, clearPersonDetails } = SelectedSlice.actions;
