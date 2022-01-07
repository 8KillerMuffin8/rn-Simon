import React from 'react';
import {StyleSheet, View} from 'react-native';
import GameContainer from '../components/GameContainer';

const GameScreen = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <GameContainer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default GameScreen;
