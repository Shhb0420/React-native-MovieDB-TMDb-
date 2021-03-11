import * as actions from './actionTypes';
import * as api from '../../reqData';

export const fetchAllMovie = (data) => {
  return {
    type: actions.FETCH_ALL_MOVIE,
    payload: api.fetchAllMovie(data),
  };
};

export const fetchAllMoviePopular = (data) => {
  return {
    type: actions.FETCH_ALL_MOVIE_POPULAR,
    payload: api.fetchAllMoviePopular(data),
  };
};

export const fetchAllMovieWatch = (data) => {
  return {
    type: actions.FETCH_ALL_MOVIE_WATCH,
    payload: api.fetchAllMovieWatch(data),
  };
};

export const fetchAllMovieDisplay = (data) => {
  return {
    type: actions.FETCH_ALL_MOVIE_DISPLAY,
    payload: api.fetchAllMovieDisplay(data),
  };
};

export const getMovieById = (itemId) => {
  return {
    type: actions.GET_MOVIE_BY_ID,
    payload: api.getMovieById(itemId),
  };
};

export const getVideoById = (itemId) => {
  return {
    type: actions.GET_VIDEO_BY_MOVIE_ID,
    payload: api.getVideoById(itemId),
  };
};