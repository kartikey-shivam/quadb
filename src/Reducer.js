import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  averageRuntime: Number,
  dvdCountry: null,
  ended: null,
  externals: {
    tvrage: null,
    thetvdb: Number,
    imdb: "",
  },
  genres: Array,
  id: Number,
  image: "",
  language: "",
  name: "",
  premiered: Date,
  rating: Number,
  summary: HTMLBodyElement,
  active: false,
};

export const customReducer = createReducer(initialState, {
  updateData: (state, action) => {
    state.averageRuntime = action.aRT;
    state.genres = action.gen;
    state.id = action.id;
    state.name = action.name;
    state.image = action.img;
    state.language = action.lang;
    state.premiered = action.prem;
    state.rating = action.rate;
    state.summary = action.sum;
    state.url = action.url;
    state.active = true;
  },
});
