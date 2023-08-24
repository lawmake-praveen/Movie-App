import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./movieSlice";
import tvSlice from "./tvSlice";
import commonSlice from "./commonSlice";
import selectedSlice from "./selectedSlice";
import swiperSlice from "./swiperSlice";

const store = configureStore({
  reducer: {
    movie: movieSlice,
    tv: tvSlice,
    common: commonSlice,
    selected: selectedSlice,
    swiper: swiperSlice,
  },
});

export default store;
