import firestore from '@react-native-firebase/firestore';

export const SET_SCORE = 'SET_SCORE';
export const SET_START_TEXT = 'SET_START_TEXT';
export const ADD_SCORE = 'ADD_SCORE';
export const GET_SCORES = 'GET_SCORES';

const doc = 'KkS7PfQGib1Z58GYlhoI';

export const setScore = score => dispatch => {
  dispatch({
    type: SET_SCORE,
    payload: score,
  });
};

export const setStartText = text => dispatch => {
  dispatch({
    type: SET_START_TEXT,
    payload: text,
  });
};

export const addScore = async (name, score, callback) => {
  try {
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

export const getScores = async didLoad => {
  const scoreboard = await firestore().collection('scoreboard').doc(doc).get();
  // console.warn(scoreboard.data());
  return dispatch => {
    didLoad ? didLoad() : null;
    dispatch({
      type: GET_SCORES,
      payload: scoreboard
        .data()
        .scores.sort((a, b) => a.score < b.score)
        .slice(0, 10),
    });
  };
};
