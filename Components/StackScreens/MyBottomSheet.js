import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import { globalStyles } from '../../export';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { EXTRA_LARGE_FONT_SIZE, LARGE_FONT_SIZE, TOP_TAB_TEXT_COLOR, width } from '../../Styles/global';
import { KEYBOARD_DISMISS_THRESHOLD } from '@gorhom/bottom-sheet';
// import { MyBottomSheet } from '../../export';

const MyBottomSheet = ({toggleModal}) => {

  return (
    <SafeAreaView style={[globalStyles.flexBox,{flex:1,position:'absolute',bottom:0,width:width,backgroundColor:'transparent',height:600 }]}>
      <View style={[globalStyles.rowContainer,{width:'100%',height:"100%",backgroundColor:'#FFFFFF' }]}>
          <View style={[{width:'100%',backgroundColor:TOP_TAB_TEXT_COLOR,height:40,paddingHorizontal:10},globalStyles.flexBoxAlign,globalStyles.rowContainer]} activeOpacity={0.9} >
            <TouchableOpacity onPress={toggleModal}>
              <MaterialCommunityIcons size={30} name='chevron-down' color={'#FFF'} />
            </TouchableOpacity>
            <View style={[globalStyles.rowContainer,{justifyContent:'space-between',width:'90%',paddingHorizontal:10,alignItems:'center'}]}>
              <Text style={[globalStyles.text,{fontSize:EXTRA_LARGE_FONT_SIZE}]} >Filter</Text>
              <TouchableOpacity>
                <Text style={[globalStyles.text,{fontWeight:'600'}]} >Reset</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
    </SafeAreaView>
  );
};

export default MyBottomSheet;
