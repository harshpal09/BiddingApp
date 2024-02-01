import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Countdown from 'react-native-countdown-component';
import {globalStyles} from '../../export';

const CountdownTimer2 = ({
  leftTimetoStart,
  remainingTime,
  hours,
  minutes,
  seconds,
  onTimeEnd,
}) => {
  const [totalSeconds, setTotalSeconds] = useState(
    hours * 3600 + minutes * 60 + seconds,
  );
  // console.log("hours ====>",hours)
  useEffect(() => {
    if (totalSeconds <= 0) {
      // onTimeEnd();
      return;
    }
  }, [totalSeconds, onTimeEnd]);

  return (
    <SafeAreaView style={[{backgroundColor: 'transparent', width: '100%', height: '100%'}]}>
      {remainingTime > 0 ? (
        <View
          style={[{backgroundColor: 'transparent', width: '100%', height: '100%'},
            globalStyles.rowContainer,
            globalStyles.flexBoxAlign,
          ]}>
          <Text
            style={[
              {
                width: '30%',
                backgroundColor: 'transparent',
                fontSize: 12,
                textAlign: 'center',
                textAlignVertical: 'center',
                fontWeight: '600',
                color: 'red',
              },
            ]}>
            Auction over IN
          </Text>

          <Countdown
            until={totalSeconds}
            size={13}
            onFinish={() => onTimeEnd()}
            digitStyle={{
              backgroundColor: '#FFF',
              borderWidth: 2,
              borderColor: '#1CC625',
            }}
            digitTxtStyle={{color: '#1CC625'}}
            timeToShow={['H', 'M', 'S']}
            timeLabels={{h: '', m: '', s: ''}}
            showSeparator
          />
        </View>
      ) : (
        <View
        style={[{backgroundColor: 'transparent', width: '100%', height: '100%'},
          globalStyles.rowContainer,
          globalStyles.flexBox,
        ]}>
        <Text
          style={[
            {
              // width: '100%',
              backgroundColor: 'transparent',
              fontSize: 14,
              textAlign: 'center',
              // textAlignVertical: 'center',
              fontWeight: '600',
              color: 'red',
            },
          ]}>
          Auction over 
        </Text>
      </View>
      )}
    </SafeAreaView>
  );
};

export default CountdownTimer2;
