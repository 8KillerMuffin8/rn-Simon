import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Context} from '../context/GameContext';

const StartButton = ({onPress, disabled}) => {
  const {state} = useContext(Context);

  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles.startButton}
      onPress={onPress}>
      <Text style={styles.text}>{state.startText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  startButton: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: '#3f3f3f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 26,
    color: '#ffffff',
  },
});

export default StartButton;
