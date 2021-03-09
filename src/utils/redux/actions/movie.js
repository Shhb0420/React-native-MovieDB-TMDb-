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
