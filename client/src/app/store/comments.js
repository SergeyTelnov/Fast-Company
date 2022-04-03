import { createSlice, createAction } from "@reduxjs/toolkit";
import commentService from "../service/comment.service";
import { nanoid } from "nanoid";
import { getCurrentUserId } from "./users";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentsCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    commentRemove: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload);
    }
  }
});

const { actions, reducer: commentsReducer } = commentsSlice;
const {
  commentsReceved,
  commentsRequestFiled,
  commentsRequested,
  commentsCreated,
  commentRemove
} = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComments(userId);
    dispatch(commentsReceved(content));
  } catch (error) {
    dispatch(commentsRequestFiled(error.message));
  }
};

const addCommentRequested = createAction("comments/addCommentRequested");
const removeCommentRequested = createAction("comments/removeCommentRequested");

export const createComment = (payload) => async (dispatch, getState) => {
  const comment = {
    ...payload,
    _id: nanoid(),
    created_at: Date.now(),
    userId: getCurrentUserId()(getState())
  };
  dispatch(addCommentRequested());
  try {
    const { content } = await commentService.createComment(comment);
    dispatch(commentsCreated(content));
  } catch (error) {
    dispatch(commentsRequestFiled(error.message));
  }
};

export const removeComment = (id) => async (dispatch) => {
  dispatch(removeCommentRequested());
  try {
    const { content } = await commentService.removeComment(id);
    if (content === null) {
      dispatch(commentRemove(id));
    }
  } catch (error) {
    dispatch(commentsRequestFiled(error.message));
  }
};

export const getComments = () => (state) => {
  return state.comments.entities;
};
export const getCommentsLoadingStatus = () => (state) => {
  return state.comments.isLoading;
};

export default commentsReducer;
