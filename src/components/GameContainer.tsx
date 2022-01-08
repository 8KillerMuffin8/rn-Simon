import React, {useEffect, useRef, useState} from 'react';
import {BackHandler, I18nManager, StyleSheet, View} from 'react-native';
import Sound from 'react-native-sound';
import {useDispatch, useSelector} from 'react-redux';
import {setScore, setStartText, getScores} from '../redux/Actions';
import GameButton from './GameButton';
import StartButton from './StartButton';
import WinModal from './WinModal';

Sound.setCategory('Playback');

/*
surprisingly the only sounds i coulds find
*/

var greenSound = new Sound('button_1.mp3', Sound.MAIN_BUNDLE);
var redSound = new Sound('button_2.mp3', Sound.MAIN_BUNDLE);
var blueSound = new Sound('button_3.mp3', Sound.MAIN_BUNDLE);
var yellowSound = new Sound('button_4.mp3', Sound.MAIN_BUNDLE);
var winSound = new Sound('correct.mp3', Sound.MAIN_BUNDLE).setVolume(0.1);
var loseSound = new Sound('incorrect.mp3', Sound.MAIN_BUNDLE).setVolume(0.1);

const GameContainer = ({navigation}) => {
  const {score} = useSelector(state => state.gameReducer);
  const dispatch = useDispatch();

  /*
    button ref to press virtually (for the computer sequence)
  */

  const greenRef = useRef();
  const redRef = useRef();
  const blueRef = useRef();
  const yellowRef = useRef();

  const isRtl = I18nManager.isRTL;

  /*
    modal ref to open modal
  */

  const modalRef = useRef();

  const [playerSequence, setPlayerSequence] = useState([]); // state var for the player sequence
  const [computerSequence, setComputerSequence] = useState([]); // state var for the computer sequence
  const [currentIndex, setCurrentIndex] = useState(0); // state var for the validation
  const [isPlaying, setIsPlaying] = useState(false);
  const [disabled, setDisabled] = useState(false); // state var to disable buttons when not playing or computer sequence is playing
  const [startButtonDisabled, setStartButtonDisabled] = useState(false); // state var to disable the start button when playing
  const [isCountingDown, setIsCountingDown] = useState(false);
  var computerSequenceTimer;
  var countDownTimer;

  //validate every time user presses

  /*
    validation works as follows:
     if the computer sequence length is not equal to the player sequence length
     we check whether the two sequences are equal at the current index, if theyre not it's a loss
     if they are we increment the index
     if the computer sequence length IS equal to the player sequence length we check one final time that the 
     numbers at the final index are equal, if they are it's a win if theyre not it's a loss
     fucking rocket science
  */

  const validate = () => {
    if (computerSequence.length !== playerSequence.length) {
      let valid =
        computerSequence[currentIndex] === playerSequence[currentIndex];
      if (valid) {
        setCurrentIndex(currentIndex + 1);
      } else {
        didLose();
      }
    } else {
      if (computerSequence.length !== 0) {
        if (
          computerSequence[computerSequence.length - 1] ===
          playerSequence[playerSequence.length - 1]
        ) {
          didWin();
        } else {
          didLose();
        }
      }
    }
  };

  const generateRandomDigit = () => {
    return Math.floor(Math.random() * 4);
  };

  //Loading the scoreboard on app start

  useEffect(() => {
    dispatch(getScores())
  }, [])

  //handling game start

  const playButtonPressed = () => {
    navigation.setOptions({tabBarVisible: false});
    setStartButtonDisabled(true);
    setDisabled(true);
    setIsPlaying(true);
    countDown(() => {
      dispatch(setScore(0));
      setCurrentIndex(0);
      setComputerSequence([generateRandomDigit()]);
      setPlayerSequence([]);
      dispatch(setStartText('0'));
    });
  };

  //countdown for start anim

  const countDown = callback => {
    let time = 3;
    setIsCountingDown(true);
    countDownTimer = setInterval(() => {
      if (time === 0) {
        callback();
        setIsCountingDown(false);
        clearInterval(countDownTimer);
      } else {
        time -= 1;
        startAnim();
        dispatch(setStartText(`${time + 1}`));
      }
    }, 1000);
  };

  const startAnim = () => {
    let index = 4;
    let timer = setInterval(() => {
      switch (index) {
        case 4:
          if (greenRef.current) {
            greenRef.current.virtualPressNoSound();
          }
          index -= 1;
          break;
        case 3:
          index -= 1;
          if (redRef.current) {
            redRef.current.virtualPressNoSound();
          }
          break;
        case 2:
          index -= 1;
          if (yellowRef.current) {
            yellowRef.current.virtualPressNoSound();
          }

          break;
        case 1:
          index -= 1;
          if (blueRef.current) {
            blueRef.current.virtualPressNoSound();
          }
          break;
        case 0:
          clearInterval(timer);
      }
    }, 250);
  };

  //Handling the hardware back button during a game

  useEffect(() => {
    if (isPlaying) {
      dispatch(setScore(0));
      setStartButtonDisabled(true);
    } else {
      setDisabled(true);
      setStartButtonDisabled(false);
    }
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (isPlaying) {
        if (isCountingDown) {
        } else {
          didLose();
        }
      } else {
        BackHandler.exitApp();
      }
      return true;
    });
  }, [isPlaying, isCountingDown]);

  //animate the simon sequence

  useEffect(() => {
    playComputerSequence(computerSequence);
  }, [computerSequence]);

  //run validation

  useEffect(() => {
    if (playerSequence.length !== 0) {
      validate();
    }
  }, [playerSequence]);

  const didWin = () => {
    dispatch(setScore(score + 1));
    dispatch(setStartText(`${score + 1}`));
    setPlayerSequence([]);
    setCurrentIndex(0);
    setComputerSequence([...computerSequence, generateRandomDigit()]);
    winSound.play();
  };

  const didLose = () => {
    setPlayerSequence([]);
    setComputerSequence([]);
    setCurrentIndex(0);
    setIsPlaying(false);
    navigation.setOptions({tabBarVisible: true});
    modalRef.current.openModal();
    dispatch(setStartText('Start'));
    loseSound.play();
  };

  //computer plays the sequence with 1000 ms (1 sec :D) delay

  function playComputerSequence(sequence) {
    setDisabled(true);
    var index = 0;
    computerSequenceTimer = setInterval(() => {
      let num = sequence[index];
      switch (num) {
        case 0:
          if (greenRef.current) {
            greenRef.current.virtualPress();
          }
          break;
        case 1:
          if (redRef.current) {
            redRef.current.virtualPress();
          }
          break;
        case 2:
          if (blueRef.current) {
            blueRef.current.virtualPress();
          }
          break;
        case 3:
          if (yellowRef.current) {
            yellowRef.current.virtualPress();
          }
          break;
      }

      if (++index === sequence.length) {
        clearInterval(computerSequenceTimer);
      }
      if (index === sequence.length) {
        setDisabled(false);
      }
    }, 1000);
  }

  //Colors

  const green = '#08fd54';
  const red = '#ff0f2b';
  const yellow = '#eded30';
  const blue = '#03e1fe';

  //Button press handler

  const buttonPressed = pos => {
    switch (pos) {
      case 0: // GREEN
        setPlayerSequence([...playerSequence, 0]);
        break;
      case 1: // RED
        setPlayerSequence([...playerSequence, 1]);
        break;
      case 2: //BLUE
        setPlayerSequence([...playerSequence, 2]);
        break;
      case 3: //YELLOW
        setPlayerSequence([...playerSequence, 3]);
        break;
    }
  };

  const ButtonContainer = () => {
    return (
      <View style={styles.buttonsContainer}>
        <View style={styles.row}>
          <GameButton
            ref={greenRef}
            tintColor={green}
            rotate={'0deg'}
            onPress={() => {
              buttonPressed(0);
            }}
            sound={greenSound}
            disabled={disabled}
          />
          <GameButton
            ref={redRef}
            tintColor={red}
            rotate={isRtl ? '270deg' : '90deg'}
            onPress={() => {
              buttonPressed(1);
            }}
            sound={redSound}
            disabled={disabled}
          />
        </View>
        <View style={styles.row}>
          <GameButton
            ref={blueRef}
            tintColor={blue}
            rotate={isRtl ? '90deg' : '270deg'}
            onPress={() => {
              buttonPressed(2);
            }}
            sound={blueSound}
            disabled={disabled}
          />
          <GameButton
            ref={yellowRef}
            tintColor={yellow}
            rotate={'180deg'}
            onPress={() => {
              buttonPressed(3);
            }}
            sound={yellowSound}
            disabled={disabled}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      <WinModal ref={modalRef} />
      {ButtonContainer()}
      <StartButton
        disabled={startButtonDisabled}
        isPlaying={isPlaying}
        onPress={() => playButtonPressed()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonsContainer: {
    height: 325,
    marginTop: 25,
    justifyContent: 'space-around',
    position: 'absolute',
  },
  row: {
    width: 325,
    marginTop: 25 / 4,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default GameContainer;
