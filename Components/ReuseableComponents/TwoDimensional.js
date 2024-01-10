import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Image from 'react-native-image-lazy-loading'
import globalStyles, { EXTRA_LARGE_FONT_SIZE, MEDIUM_FONT_SIZE, width } from '../../Styles/global';

export default function TwoDimensional() {
  
  const aspectRatio = 1080 / 1920;

  const hintIcon = {
    width: 40,
    height: 30,
    borderRadius: 12,
    borderWidth: 0,
    textAlign: 'center',
    lineHeight: 27,
    overflow: 'hidden',
    color:'white',
    fontWeight:'700',
    padding: 0, // Set padding to 0 to remove default padding
  };
  const hintText = {
    width: '80%',
    // height: 30,
    fontSize:13,
    fontWeight:'700',
    padding:10,
    // backgroundColor:'red',
    
  };
  
  // Calculate the width based on the aspect ratio and the phone's width
  const imageWidth = width-31;
  const imageHeight = imageWidth / aspectRatio;

  return (
    <View style={{flex:1}}>
      <View style={[globalStyles.flexBoxJustify,{width:'100%',padding:10,backgroundColor:'transparent'}]}>
          <View style={[{backgroundColor:'transparent',width:'100%'}]}><Text style={{fontSize:EXTRA_LARGE_FONT_SIZE,fontWeight:"bold"}}>Hints</Text></View>
          <View style={[globalStyles.rowContainer,{backgroundColor:'transparent',padding:5,width:'100%'}]}>
            <View style={{backgroundColor:'transparent',width:'50%'}}>
              <View style={[{width:'100%',backgroundColor:'transparent',padding:5},globalStyles.flexBox,globalStyles.rowContainer]}>
                <Text style={[hintIcon, { backgroundColor: 'magenta' }]}>A1</Text>
                <Text style={[hintText]}>Minor Scratch</Text>
              </View>
              <View style={[{width:'100%',backgroundColor:'transparent',padding:5},globalStyles.flexBox,globalStyles.rowContainer]}>
                <Text style={[hintIcon, { backgroundColor: 'darkmagenta' }]}>A2</Text>
                <Text style={[hintText]}>Major or Multiple Scratches</Text>
              </View>
              <View style={[{width:'100%',backgroundColor:'transparent',padding:5},globalStyles.flexBox,globalStyles.rowContainer]}>
                <Text style={[hintIcon, { backgroundColor: '#b7410e' }]}>E1</Text>
                <Text style={[hintText]}>Minor Dent</Text>
              </View>
              <View style={[{width:'100%',backgroundColor:'transparent',padding:5},globalStyles.flexBox,globalStyles.rowContainer]}>
                <Text style={[hintIcon, { backgroundColor: '#A55D35' }]}>E2</Text>
                <Text style={[hintText]}>Major or Multiple Dents</Text>
              </View>
              {/* <View>
                <Text></Text>
                <Text></Text>
              </View> */}
            </View>
            <View style={{backgroundColor:'transparent',width:'50%'}}>
              <View style={[{width:'100%',backgroundColor:'transparent',padding:5},globalStyles.flexBox,globalStyles.rowContainer]}>
                <Text style={[hintIcon, { backgroundColor: '#009dc4' }]}>G3</Text>
                <Text style={[hintText]}>Glass Replaced</Text>
              </View>
              <View style={[{width:'100%',backgroundColor:'transparent',padding:5},globalStyles.flexBox,globalStyles.rowContainer]}>
                <Text style={[hintIcon, { backgroundColor: 'green' }]}>O</Text>
                <Text style={[hintText]}>Original</Text>
              </View>
              <View style={[{width:'100%',backgroundColor:'transparent',padding:5},globalStyles.flexBox,globalStyles.rowContainer]}>
                <Text style={[hintIcon, { backgroundColor: '#ebb607' }]}>OK</Text>
                <Text style={[hintText]}>OK</Text>
              </View>
              <View style={[{width:'100%',backgroundColor:'transparent',padding:5},globalStyles.flexBox,globalStyles.rowContainer]}>
                <Text style={[hintIcon, { backgroundColor: '#ad1320' }]}>S2</Text>
                <Text style={[hintText]}>Repainted - Bad Quality</Text>
              </View>
              {/* <View>
                <Text></Text>
                <Text></Text>
              </View> */}
            </View>
          </View>
      </View>
      <View>
        <Image 
           style={{ width: imageWidth, height: imageHeight }}
          source={require('../../Assets/Images/Two_Dimensional.jpg')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})