import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Context as GameContext} from '../context/GameContext';
import {Context as ScoreboardContext} from '../context/ScoreboardContext';
import {navigate} from './RootNavigation';

const WinModal = ({}, ref) => {
  const {state} = useContext(GameContext);
  const {addScore, getScores} = useContext(ScoreboardContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [inputColor, setInputColor] = useState('#3f3f3f');

  useImperativeHandle(ref, () => ({
    openModal: () => {
      setModalVisible(true);
    },
  }));

  useEffect(() => {
    setName('');
  }, [modalVisible]);

  const submitButton = () => {
    return (
      <TouchableOpacity onPress={() => onSubmit()}>
        <View style={styles.submitWrap}>
          <Text>Submit</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const inputStyle = {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: inputColor,
    borderBottomWidth: 1,
    marginVertical: 10,
  };

  const input = () => {
    return (
      <View style={inputStyle}>
        <TextInput
          value={name}
          placeholderTextColor={inputColor}
          onChangeText={text => {
            setName(text);
            setInputColor('#3f3f3f');
          }}
          placeholder="Enter your name"
          style={{textAlign: 'center'}}
        />
      </View>
    );
  };

  const scoreText = () => {
    return (
      <>
        <Text>You Lost with the score</Text>
        <Text style={styles.score}>{state.score}</Text>
      </>
    );
  };

  const onSubmit = () => {
    if (name.length != 0) {
      setModalVisible(false);
      addScore(name, state.score, () => getScores());
      navigate('ScoreBoard');
    } else {
      setInputColor('#ff0f2b');
    }
  };

  const closeBtn = () => {
    return (
      <TouchableOpacity
        style={styles.close}
        onPress={() => setModalVisible(false)}>
        <Text>X</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}>
      <View style={StyleSheet.absoluteFill} />
      <View style={styles.modalBg}>
        {/* press outside modal closes it */}
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => {
            setModalVisible(false);
          }}
        />
        <View style={styles.modalWrapper}>
          {closeBtn()}
          {scoreText()}
          {input()}
          {submitButton()}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    width: '75%',
    height: '60%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000050',
  },
  submitWrap: {
    width: 150,
    height: 50,
    backgroundColor: '#afafaf',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 6,
  },
  score: {
    fontSize: 30,
  },
  close: {
    position: 'absolute',
    top: 10,
    right: 15,
    transform: [{scaleX: 1.2}],
  },
});

export default forwardRef(WinModal);
