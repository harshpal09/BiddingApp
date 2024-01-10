import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import your theme colors
import globalStyles, {
  BLUE_COLOR,
  EXTRA_LARGE_FONT_SIZE,
  height,
} from '../../Styles/global.js';

const Login = ({onNext, navigation}) => {
  const [mobileNumber, setMobileNumber] = useState('+91');
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setMobileNumber('+91');
  }, [navigation]);

  const isLoggedInUser = async () => {
    setMobileNumber('+91');
    const value = await AsyncStorage.getItem('user_id');
    // Handle user authentication as needed
  };

  const handleNext = () => {
    // Validate the mobile number, send OTP, and navigate to the OTP input screen
    onNext(mobileNumber);
  };
  const handleTextInput = text => {
    // If the text is less than "+91", keep it as "+91"
    if (text.length < 3) {
      setMobileNumber('+91');
    } else {
      setMobileNumber(text);
    }
  };

  const sendOTP = async () => {
    if (!mobileNumber) {
      setError('Please enter the number');
      return;
    }

    try {
      setToggle(true);
      setError(null);

      const response = await axios.post(
        'https://crm.unificars.com/api/otplogin',
        {
          mobile: mobileNumber.substring(3),
        },
      );
      if (response.data.code === 200) {
        setMobileNumber('');
        setError(null);

        setToggle(false);
        return navigation.navigate('otp', {number: mobileNumber.substring(3)});
      } else {
        // console.log('->', response.data.status);
        setError(response.data.status);
      }
    } catch (error) {
      console.error('Network request error:', error);
      setError('Network request failed');
    } finally {
      setToggle(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <View style={{width: '100%'}}>
        <Image
          source={require('../../Assets/Images/unifi_black_logo.png')}
          style={{width: '100%', height: 150}}
        />
      </View>
      <View style={{width: '100%'}}>
        <Image
          source={require('../../Assets/Images/Frame.png')}
          style={{width: '100%', height: height / 3}}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          onChangeText={text => {
            setMobileNumber(text), handleTextInput(text);
          }}
          placeholderTextColor={'black'}
          // defaultValue='+91'
          value={mobileNumber}
        />
      </View>
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => sendOTP()}
        disabled={toggle}>
        {toggle ? (
          <ActivityIndicator size={'small'} />
        ) : (
          <Text style={globalStyles.buttonText}>Next</Text>
        )}
      </TouchableOpacity>
      {/* Conditional rendering for error message */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // White background
    padding: 16,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white', // Input background
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: EXTRA_LARGE_FONT_SIZE,
    borderWidth: 2,
    borderColor: BLUE_COLOR,
    color: 'black',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  },
});

export default Login;
