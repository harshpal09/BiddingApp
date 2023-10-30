import {StyleSheet, Text, View,TextInput,TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react';
import globalStyles, { BLUE_COLOR, LARGE_FONT_SIZE, LIGHT_BLUE, ORANGE_COLOR, TOP_TAB_COLOR, TOP_TAB_TEXT_COLOR } from '../../Styles/global';
import Feather from 'react-native-vector-icons/Feather'

export default function HeaderSearch({navigation}) {
  return (
    <SafeAreaView style={[globalStyles.searchBar,{justifyContent:'space-around',backgroundColor:TOP_TAB_COLOR,alignItems:'center',height:50}]}>
      <Text style={{fontSize:LARGE_FONT_SIZE,fontWeight:'bold',color:TOP_TAB_TEXT_COLOR,width:'40%'}}>
        
      </Text>
      <TouchableOpacity
        onPress={()=> navigation.navigate('ss')}
        style={[globalStyles.searchButton,{width:'40%',display:'flex',alignItems:"flex-end"}]}>
        <Feather name="search" color={TOP_TAB_TEXT_COLOR} size={18}  />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
