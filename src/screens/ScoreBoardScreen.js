import React, {useEffect} from 'react';
import {I18nManager, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {getScores} from '../redux/Actions';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const ScoreBoardScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const {scores} = useSelector(state => state.scoreboardReducer);
  const dispatch = useDispatch();

  const isRtl = I18nManager.isRTL;

  const mainContainerStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    dispatch(getScores());
  }, []);

  const renderItem = item => {
    return isRtl ? (
      <View style={styles.itemWrapper}>
        <View style={styles.itemTextWrapper}>
          <>
            <Text style={styles.itemText}>{`Score: ${item.item.score}`}</Text>
            <Text style={styles.itemText}>{`Name: ${item.item.name}`}</Text>
          </>
        </View>
        <Text>{item.index + 1}</Text>
      </View>
    ) : (
      <View style={styles.itemWrapper}>
        <Text>{item.index + 1}</Text>
        <View style={styles.itemTextWrapper}>
          <>
            <Text style={styles.itemText}>{`Name: ${item.item.name}`}</Text>
            <Text style={styles.itemText}>{`Score: ${item.item.score}`}</Text>
          </>
        </View>
      </View>
    );
  };

  const itemSeparatorComponent = () => {
    return <View style={styles.itemSeparatorComponent} />;
  };

  const listEmptyComponent = () => {
    return <Text>Loading...</Text>;
  };

  const title = () => {
    return (
      <View>
        <Text style={styles.title}>Scoreboard</Text>
      </View>
    );
  };

  return (
    <View style={mainContainerStyle}>
      {title()}
      <FlatList
        style={{width: '100%'}}
        scrollEnabled
        data={scores}
        keyExtractor={(_, index) => index}
        renderItem={renderItem}
        ItemSeparatorComponent={itemSeparatorComponent}
        ListEmptyComponent={listEmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    flex: 1,
  },
  itemText: {},
  itemSeparatorComponent: {
    width: '100%',
    height: 1,
    backgroundColor: '#3f3f3f',
  },
  title: {
    fontSize: 30,
  },
});

export default ScoreBoardScreen;
