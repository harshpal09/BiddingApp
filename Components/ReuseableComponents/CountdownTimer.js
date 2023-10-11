import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MEDIUM_FONT_SIZE } from '../../Styles/global';
import globalStyles from '../../Styles/global';
import { Button } from 'react-native-paper';

const CountdownTimer = ({ stamps }) => {
  const [remainingTime, setRemainingTime] = useState(undefined);
  const [timeLeftToStart, setTimeLeftToStart] = useState(undefined);


  // console.log(stamps)

  const calculateTimeLeft = (currentDate, startTime, endTime) => {
    const currentDateObj = new Date();
    const startTimeObj = new Date(`${currentDate}T${startTime}`);
    const endTimeObj = new Date(`${currentDate}T${endTime}`);
    const currentTimestamp = currentDateObj.getTime();

    // Calculate the time left in seconds until the auction starts
    currentTimestamp < startTimeObj.getTime()
      ? setTimeLeftToStart(Math.floor((startTimeObj - currentTimestamp) / 1000))
      : setRemainingTime(Math.floor((endTimeObj - currentTimestamp) / 1000));

  };
  useEffect(() => {
    calculateTimeLeft(stamps.start_date, stamps.start_time, stamps.end_time);
  }, [])
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeftToStart >= 0) {
        setTimeLeftToStart(prevTime => prevTime - 1);
        if(timeLeftToStart == 0) {
        calculateTimeLeft(stamps.start_date, stamps.start_time, stamps.end_time);
        }
      }
      else if (remainingTime > 0) {
        setRemainingTime(prevTime => prevTime - 1); // Decrement the state value
      }
      else {
        clearInterval(timer);
      }
    },1000);
  
    return () => {
      clearInterval(timer);
    };
  }, [timeLeftToStart, remainingTime]);

  





  const formatTime = time => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}H : ${minutes
      .toString()
      .padStart(2, '0')}M : ${seconds.toString().padStart(2, '0')}S`;
  };

  return (
    <View style={[globalStyles.bidContainer, globalStyles.flexBox]}>
      {
        timeLeftToStart >= 0 ?
          <View
            style={[
              globalStyles.columnContainer,
              globalStyles.greenTextContainer,
              globalStyles.flexBox,
            ]}>
            <Text style={[globalStyles.greenText]}>Auction Start In</Text>

            <View style={styles.container}>
              <Text style={styles.timerText}>{formatTime(timeLeftToStart)}</Text>
            </View>
          </View>
          :
          remainingTime > 0 ?
          <View
            style={[
              globalStyles.columnContainer,
              globalStyles.greenTextContainer,
              globalStyles.flexBox,
            ]}>
            <Text style={[globalStyles.greenText]}>Auction Over In</Text>
            <View style={styles.container}>
              <Text style={styles.timerText}>{formatTime(remainingTime)}</Text>
            </View>
          </View>
          :
          
          <View
            style={[
              globalStyles.columnContainer,
              globalStyles.greenTextContainer,
              globalStyles.flexBox,
            ]}>
            <Text style={[globalStyles.greenText]}>Auction Over</Text>
          </View>

      }

    </View>


  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: MEDIUM_FONT_SIZE,
    color:'#000',
    fontWeight:"500"
  },
});

export default CountdownTimer;
