import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Image, SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {isReadyRef, navigationRef} from './src/components/RootNavigation';
import {Provider as GameProvider} from './src/context/GameContext';
import {Provider as ScoreboardProvider} from './src/context/ScoreboardContext';
import GameScreen from './src/screens/GameScreen';
import ScoreBoardScreen from './src/screens/ScoreBoardScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const Tab = createBottomTabNavigator();

  const TabNavigator = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Game"
          component={GameScreen}
          options={{
            tabBarIcon: ({color, size}) => {
              return (
                <Image
                  source={require('./src/assets/icons/simon.png')}
                  style={{
                    width: size,
                    height: size,
                    resizeMode: 'contain',
                    tintColor: color,
                  }}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="ScoreBoard"
          component={ScoreBoardScreen}
          options={{
            tabBarIcon: ({color, size}) => {
              return (
                <Image
                  source={require('./src/assets/icons/scoreboard.png')}
                  style={{
                    width: size,
                    height: size,
                    resizeMode: 'contain',
                    tintColor: color,
                  }}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <GameProvider>
      <ScoreboardProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            isReadyRef.current = true;
          }}>
          <SafeAreaView style={backgroundStyle}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            {TabNavigator()}
          </SafeAreaView>
        </NavigationContainer>
      </ScoreboardProvider>
    </GameProvider>
  );
};

export default App;
