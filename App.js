import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Image, SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {isReadyRef, navigationRef} from './src/components/RootNavigation';
import GameScreen from './src/screens/GameScreen';
import ScoreBoardScreen from './src/screens/ScoreBoardScreen';
import {Provider} from 'react-redux';
import {Store} from './src/redux/Store';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const Tab = createBottomTabNavigator();

  const TabNavigator = () => {
    return (
      <Tab.Navigator
        tabBarOptions={{
          style: {backgroundColor: isDarkMode ? Colors.darker : Colors.lighter},
        }}>
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
    <Provider store={Store}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          {TabNavigator()}
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
