import {ActionType} from 'redux-promise-middleware';

export const FETCH_ALL_MOVIE = 'fetchAllMovie';
export const FETCH_ALL_MOVIE_POPULAR = 'fetchAllMoviePopular';
export const FETCH_ALL_MOVIE_WATCH = 'fetchAllMovieWatch';

export const PENDING = `_${ActionType.Pending}`;
export const FULFILLED = `_${ActionType.Fulfilled}`;
export const REJECTED = `_${ActionType.Rejected}`;
