import createDataContext from './createDataContext';

/*
state managment for game values
*/

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'set_score':
      return {...state, score: action.payload};
    case 'set_start_text':
      return {...state, startText: action.payload};
    default:
      return state;
  }
};

const setScore = dispatch => score => {
  dispatch({type: 'set_score', payload: score});
};

const setStartText = dispatch => text => {
  dispatch({type: 'set_start_text', payload: text});
};

export const {Context, Provider} = createDataContext(
  gameReducer,
  {setScore, setStartText},
  {score: 0, isPlaying: false, startText: 'Start'},
);
