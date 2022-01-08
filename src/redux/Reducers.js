import {SET_SCORE, SET_START_TEXT, GET_SCORES} from './Actions';

export const gameReducer = (
  state = {
    score: 0,
    startText: 'Start',
  },
  action,
) => {
  switch (action.type) {
    case SET_SCORE:
      return {...state, score: action.payload};
    case SET_START_TEXT:
      return {...state, startText: action.payload};
    default:
      return state;
  }
};

export const scoreboardReducer = (
  state = {
    scores: [],
  },
  action,
) => {
  switch (action.type) {
    case GET_SCORES:
      return {...state, scores: action.payload};
    default:
      return state;
  }
};
