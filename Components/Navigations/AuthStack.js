import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import { Login,Otp} from '../../export';


const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator 
    initialRouteName='login'
    screenOptions={{
      ...TransitionPresets.SlideFromRightIOS, // Use slide transition
    }}
    >
     <Stack.Screen name='login' component={Login} options={{headerShown:false}}/> 
     <Stack.Screen name='otp' component={Otp} options={{headerShown:false,gestureEnabled:false}} /> 
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})