import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import { Profile ,ManageProfile,PaymentDetails,Address} from '../../export';


const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator 
    initialRouteName='profile'
    screenOptions={{
      ...TransitionPresets.SlideFromRightIOS, // Use slide transition
    }}
    >
     <Stack.Screen name='profile' component={Profile} options={{headerShown:false}}/> 
     <Stack.Screen name='manage_profile' component={ManageProfile} options={{headerShown:true,headerTitle:'Manage profile'}} /> 
     <Stack.Screen name='payment' component={PaymentDetails} options={{headerShown:true}} /> 
     <Stack.Screen name='address' component={Address} options={{headerShown:true}}/> 
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})