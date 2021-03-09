import * as actions from '../actions/actionTypes';

const initialState = {
  msg: '',
  status: '',
  movie: [],
  popular: [],
  watch: [],
  isPending: false,
  isFulfilled: false,
  isRejected: false,
};

const movieReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case actions.FETCH_ALL_MOVIE + actions.PENDING:
      return {
        ...state,
        isPending: true,
      };
    case actions.FETCH_ALL_MOVIE + actions.REJECTED:
      return {
        ...state,
        isPending: false,
        isRejected: true,
        isFulfilled: false,
      };
    case actions.FETCH_ALL_MOVIE + actions.FULFILLED:
      if (payload.status === 200) {
        return {
          ...state,
          isPending: false,
          isFulfilled: true,
          movie: payload.data.results,
          // status: payload.data.data.msg,
        };
      } else {
        return {
          ...state,
          isPending: false,
          isRejected: true,
          isFulfilled: true,
          // status: payload.data.data.msg,
        };
      }
    case actions.FETCH_ALL_MOVIE_POPULAR + actions.PENDING:
      return {
        ...state,
        isPending: true,
      };
    case actions.FETCH_ALL_MOVIE_POPULAR + actions.REJECTED:
      return {
        ...state,
        isPending: false,
        isRejected: true,
        isFulfilled: false,
      };
    case actions.FETCH_ALL_MOVIE_POPULAR + actions.FULFILLED:
      if (payload.status === 200) {
        return {
          ...state,
          isPending: false,
          isFulfilled: true,
          popular: payload.data.results,
          // status: payload.data.data.msg,
        };
      } else {
        return {
          ...state,
          isPending: false,
          isRejected: true,
          isFulfilled: true,
          // status: payload.data.data.msg,
        };
      }
    case actions.FETCH_ALL_MOVIE_WATCH + actions.PENDING:
      return {
        ...state,
        isPending: true,
      };
    case actions.FETCH_ALL_MOVIE_WATCH + actions.REJECTED:
      return {
        ...state,
        isPending: false,
        isRejected: true,
        isFulfilled: false,
      };
    case actions.FETCH_ALL_MOVIE_WATCH + actions.FULFILLED:
      if (payload.status === 200) {
        return {
          ...state,
          isPending: false,
          isFulfilled: true,
          watch: payload.data.results,
          // status: payload.data.data.msg,
        };
      } else {
        return {
          ...state,
          isPending: false,
          isRejected: true,
          isFulfilled: true,
          // status: payload.data.data.msg,
        };
      }
    default:
      return state;
  }
};

export default movieReducer;