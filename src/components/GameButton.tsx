import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {Animated, Pressable, StyleSheet, View} from 'react-native';

const width = 50;
const size = 150;

const GameButton = ({tintColor, onPress, rotate, sound, disabled}, ref) => {
  const itemScale = useRef(new Animated.Value(1)).current;
  const animDuration = 50;

  //giving virtualpress function access to parent component (for the computer sequence)

  useImperativeHandle(ref, () => ({
    virtualPress: () => {
      virtualPress(); // virtual press for simon sequence
    },
    virtualPressNoSound: () => {
      virtualPressNoSound(); //virtual press for start anim
    },
  }));

  const pressInAnim = () => {
    Animated.timing(itemScale, {
      toValue: 1.1,
      duration: animDuration,
      useNativeDriver: true,
    }).start();
  };
  const pressOutAnim = () => {
    Animated.timing(itemScale, {
      toValue: 1,
      duration: animDuration,
      useNativeDriver: true,
    }).start();
  };

  const virtualPress = () => {
    sound.play();
    Animated.sequence([
      Animated.timing(itemScale, {
        toValue: 1.1,
        duration: animDuration,
        useNativeDriver: true,
      }),
      Animated.delay(500),
      Animated.timing(itemScale, {
        toValue: 1,
        duration: animDuration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      sound.stop();
    });
  };

  const virtualPressNoSound = () => {
    Animated.sequence([
      Animated.timing(itemScale, {
        toValue: 1.1,
        duration: animDuration,
        useNativeDriver: true,
      }),
      Animated.delay(100),
      Animated.timing(itemScale, {
        toValue: 1,
        duration: animDuration,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const defaultStyle = {
    width: size,
    height: size,
    backgroundColor: '#00000000',
    borderTopLeftRadius: size,
    borderLeftWidth: width,
    borderTopWidth: width,
    borderColor: tintColor,
  };

  const containerStyle = {
    transform: [{rotateZ: rotate}],
    width: size,
    height: size,
  };

  return (
    <View style={containerStyle}>
      <Animated.View style={{transform: [{scale: itemScale}]}}>
        <Pressable
          disabled={disabled}
          style={defaultStyle}
          onPress={onPress}
          onPressIn={() => {
            pressInAnim();
            sound.play();
            sound.setNumberOfLoops(-1);
          }}
          onPressOut={() => {
            pressOutAnim();
            sound.stop();
          }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default forwardRef(GameButton);
