import React from 'react';
import {StyleSheet, View} from 'react-native';
import GameContainer from '../components/GameContainer';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const GameScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const mainContainerStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={mainContainerStyle}>
      <GameContainer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default GameScreen;
