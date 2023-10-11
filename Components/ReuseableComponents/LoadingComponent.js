import { SafeAreaView, StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'
import { globalStyles } from '../../export'
import { height, width } from '../../Styles/global'

export default function LoadingComponent() {
  return (
    <SafeAreaView style={[globalStyles.flexBox,{width:width,height:height,backgroundColor:'white'}]}>
        <Image source={require('../../Assets/Images/Citydriver.gif')} style={{width:width,height:height/2}} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})