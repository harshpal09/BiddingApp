import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const CustomHeader = ({ onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        onChangeText={onChangeText}
        style={styles.textInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
});

export default CustomHeader;
