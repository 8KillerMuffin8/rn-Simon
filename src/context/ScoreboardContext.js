import createDataContext from './createDataContext';
import firestore from '@react-native-firebase/firestore';

/*
state managment for setting and getting scores with firebase firestore
*/

const scoreboardReducer = (state, action) => {
  switch (action.type) {
    case 'get_scores':
      return {scores: action.payload};
    default:
      return state;
  }
};

const doc = 'KkS7PfQGib1Z58GYlhoI';

const addScore = dispatch => async (name, score, callback) => {
  const map = new Map();
  try {
    map.set('name', name);
    map.set('score', score);
    await firestore()
      .collection('scoreboard')
      .doc(doc)
      .update({
        scores: firestore.FieldValue.arrayUnion({name, score}),
      });
    callback ? callback() : null;
  } catch (e) {
    console.warn(e);
  }
};

const getScores = dispatch => async didLoad => {
  try {
    const scoreboard = await firestore()
      .collection('scoreboard')
      .doc(doc)
      .get();
    didLoad ? didLoad() : null;

    dispatch({
      type: 'get_scores',
      payload: scoreboard
        .data()
        .scores.sort((a, b) => a.score < b.score)
        .slice(0, 10),
    });
  } catch (e) {
    didLoad ? didLoad() : null;
    console.warn(e);
  }
};

export const {Context, Provider} = createDataContext(
  scoreboardReducer,
  {addScore, getScores},
  {scores: []},
);
