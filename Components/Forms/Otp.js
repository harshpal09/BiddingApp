// OTP.js (2nd component for OTP input)
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';

import {
  ORANGE_COLOR,
  BLUE_COLOR,
  INACTIVE_TINT_COLOR,
  LARGE_FONT_SIZE,
  MEDIUM_FONT_SIZE,
} from '../../Styles/global.js'; // Import your theme colors
import {toggleBoolean} from '../../Redux/Actions/booleanActions.js';
import { getToken } from '../ReuseableComponents/NotificationListener.js';

const OTP = ({route, navigation}) => {
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState(null);
  const [token,setToken] = useState('');
  const dispatch = useDispatch();
  const boolstate = useSelector(state => state.booleanState);
  const [otp, setOtp] = useState('');

  // console.log('global state in otp page is => ', boolstate);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      // console.log("opt token", token); // This should log the actual token value
      setToken(token);
    };
    fetchToken();
  }, [])
  

  const verifyOTP = async () => {
    // console.log("opt token", token)
    const {number} = route.params;
    setToggle(toggle);
    if (!otp) {
      setError("Please enter the OTP");
      setToggle(false);
      return;
    }

    try {
      let response = await axios.post(
        'https://crm.unificars.com/api/otpverify',
        {
          mobile: number,
          otp: otp,
          token:token,
        },
      );
      if (response.data.code == 200) {
        try {
          await AsyncStorage.setItem('user_id', response.data.data.id);
        } catch (error) {
          console.log('error =>', error);
        }
        setToggle(false)
        dispatch(toggleBoolean(true));
        return navigation.navigate('tab');
      } else {
        setError(response.data.status)
      }
    } catch (error) {
      console.log('error => ',error);
      setError("Network request failed"); 
    }
    setToggle(false);
  };

  let otpInput = useRef(null);

  const clearText = () => {
    otpInput.current.clear();
  };

  // const sendOTP = async () => {
  //   setToggle(true);
  //   setError(null); // Clear any previous errors

  // // Validate if the mobile number is empty
  // if (!mobileNumber) {
  //   setError("Please enter the number");
  //   setToggle(false);
  //   return;
  // }
  // console.log('number => ',mobileNumber);
  //   try {
  //     let response = await axios.post('https://crm.unificars.com/api/otplogin', {
  //       mobile: mobileNumber.substring(3),
  //     });

  //     if (response.data.code === 200) {
  //       setToggle(false);
  //       return navigation.replace('otp', { number: mobileNumber.substring(3) });
  //     } else {
  //       console.log("->", response.data.status);
  //       setError(response.data.status); // Set error state
  //     }
  //   } catch (error) {
  //     console.error("Network request error:", error);
  //     setError("Network request failed"); // Set error state for network errors
  //   }

  //   setToggle(false);
  // };

  // console.log('global state in out of the on otp page is => ', boolstate);
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>
        Please enter the OTP sent to your mobile number.
      </Text>
      <View style={styles.otpContainer}>
        <OTPTextInput
          ref={otpInput}
          containerStyle={styles.otpInputContainer}
          inputCount={6}
          textInputStyle={styles.otpInput}
          tintColor={BLUE_COLOR}
          handleTextChange={text => setOtp(text)}
        />
      </View>
      {/* <TouchableOpacity style={styles.clearButton} onPress={clearText}>
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.verifyButton} onPress={() => verifyOTP()} disabled={toggle}>
      {toggle ? <ActivityIndicator size={'small'} /> : <Text style={styles.verifyButtonText}>Verify</Text>}
      </TouchableOpacity>
      <TouchableOpacity style={{paddingVertical:20}} onPress={()=> navigation.goBack()} >
        <Text style={{color:BLUE_COLOR,fontSize:MEDIUM_FONT_SIZE,fontWeight:'700'}}>Resend the OTP?</Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red', // White background
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: ORANGE_COLOR, // Text color (changed to orange for OTP)
  },
  subtitle: {
    fontSize: LARGE_FONT_SIZE,
    color: INACTIVE_TINT_COLOR, // Text color
    marginBottom: 24,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  },
  otpContainer: {
    // width:'100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // overflow:'scroll'
    // backgroundColor:'green'
  },
  otpInputContainer: {
    // width:'0%',
    // backgroundColor:'grey'
    // borderWidth: 2,
    // // borderColor: ORANGE_COLOR, // Use ORANGE_COLOR for border color
    // borderRadius: 10,
    // paddingHorizontal: 16,
    // paddingVertical: 10,
    // marginHorizontal: 4,
  },
  otpInput: {
    fontSize: 20,
    color: ORANGE_COLOR, // Use ORANGE_COLOR for text color
  },
  clearButton: {
    width: '95%',
    marginTop: 20,
    backgroundColor: ORANGE_COLOR, // Use ORANGE_COLOR for button background
    borderRadius: 8,
  },
  clearButtonText: {
    fontSize: LARGE_FONT_SIZE,
    color: '#fff',
    fontWeight: 'bold',
    // textAlign: 'center',
  },
  verifyButton: {
    width: '95%',
    marginTop: 20,
    height: 40,
    backgroundColor: BLUE_COLOR, // Use BLUE_COLOR for button background
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  verifyButtonText: {
    fontSize: LARGE_FONT_SIZE,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default OTP;