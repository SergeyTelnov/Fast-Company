import { createSlice } from "@reduxjs/toolkit";
import professionService from "../service/profession.service";

const professionsSlice = createSlice({
  name: "professions",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    professionsRequested: (state) => {
      state.isLoading = true;
    },
    professionsReceved: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    professionsRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { actions, reducer: professionsReducer } = professionsSlice;
const { professionsReceved, professionsRequestFiled, professionsRequested } =
  actions;

function isOutDated(date) {
  if (Date.now() - date > 10 * 60 * 1000) {
    return true;
  }
  return false;
}

export const loadProfessionsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().professions;
  if (isOutDated(lastFetch)) {
    dispatch(professionsRequested());
    try {
      const { content } = await professionService.get();
      dispatch(professionsReceved(content));
    } catch (error) {
      dispatch(professionsRequestFiled(error.message));
    }
  }
};

export const getProfessions = () => (state) => {
  return state.professions.entities;
};
export const getProfessionsLoadingStatus = () => (state) => {
  return state.professions.isLoading;
};

export const getProfessionByIds = (professoinsIds) => (state) => {
  if (state.professions.entities) {
    return state.professions.entities.find((p) => p._id === professoinsIds);
  }
  return [];
};

export default professionsReducer;
