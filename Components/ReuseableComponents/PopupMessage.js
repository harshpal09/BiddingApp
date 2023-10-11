import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import globalStyles, { BLUE_COLOR, LIGHT_BLUE, SMALL_FONT_SIZE } from '../../Styles/global';

const PopupMessage = ({ message }) => {
  const parentWidth = Dimensions.get('window').width * 0.95; // 95% of parent width

  return (
    <View
      style={[{
        position: 'absolute',
        top: 20, // Adjust the top position as needed
        left: (Dimensions.get('window').width - parentWidth) / 2, // Center horizontally
        width: parentWidth,
        padding: 10,
        backgroundColor: LIGHT_BLUE,
        borderRadius: 10,
      },globalStyles.shadow]}
    >
      {/* Notch on the Upper Side */}
      <View
        style={{
          width: 0,
          height: 0,
          borderRadius:-30,
          borderLeftWidth: 10,
          borderRightWidth: 10,
          borderBottomWidth: 20,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: LIGHT_BLUE,
          position: 'absolute',
          top:-7,
          left: parentWidth / 2 - 10, // Center the notch
        }}
      />

      {/* Message Text */}
      <Text style={{textAlign:'center', fontSize: SMALL_FONT_SIZE,fontWeight:'800',color:BLUE_COLOR }}>{message}</Text>
    </View>
  );
};

export default PopupMessage;
