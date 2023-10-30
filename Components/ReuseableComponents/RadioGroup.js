import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { globalStyles } from '../../export';
import { BLUE_COLOR, MEDIUM_FONT_SIZE } from '../../Styles/global';
// import { TouchableOpacity } from 'react-native-gesture-handler';

export default function RadioGroup({ radioButtons, index, onChange }) {
  const [data, setData] = useState(radioButtons);

  useEffect(() => {
    setData(radioButtons);
  }, [radioButtons]);

  const setState = (ind) => {
    if (data[index] && data[index].key) {
      const updatedData = [...data];
      updatedData[index].key.forEach((button, buttonIndex) => {
        button.selected = buttonIndex === ind;
      });
      console.log("curr =>",updatedData[index])
      setData(updatedData);
      onChange(updatedData); // Notify the parent component about the change
    }
  };

  if (!data[index] || !data[index].key) {
    return null; // Render nothing if data[index] is not defined
  }

  return (
    <View
      style={[
        globalStyles.flexBox,
        { backgroundColor: 'transparent', width: '100%', padding: 10 },
      ]}>
      {data[index].key.map((val, ind) => (
        <TouchableOpacity
          style={[
            globalStyles.flexBoxAlign,
            {
              backgroundColor: 'transparent',
              width: '90%',
              padding: 5,
              justifyContent: 'space-around',
            },
            globalStyles.rowContainer,
          ]}
          onPress={() => {setState(ind),console.log(data[index].name)}}
          key={ind}>
          <MaterialIcons
            name={val.selected ? 'radio-button-on' : 'radio-button-off'}
            size={23}
            style={[{ backgroundColor: 'transparent' }]}
            color={BLUE_COLOR}
          />
          <Text
            style={[
              {
                backgroundColor: 'transparent',
                width: '80%',
                color: BLUE_COLOR,
                fontSize: MEDIUM_FONT_SIZE,
                fontWeight: '600',
              },
            ]}>
            {val.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({});
