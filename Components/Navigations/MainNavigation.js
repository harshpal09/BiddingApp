import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack'; 
import {HomeScreen,TabRoutes,StackRoutes, Address, ManageProfile, PaymentDetails,CarProfile, SearchScreen, PhotoGallery, Login, Otp, MyBottomSheet} from '../../export'

const Stack = createStackNavigator();



export default function MainNavigation() {
  return (
    <Stack.Navigator 
        initialRouteName='tab'
        screenOptions={{
        ...TransitionPresets.SlideFromRightIOS, // Use slide transition
        }}
    >
      <Stack.Screen name="otpscreen" component={Otp} options={{headerShown:false}} />
      <Stack.Screen name="tab" component={TabRoutes} options={{headerShown:false}} />
      <Stack.Screen name="manage_profile" component={ManageProfile} options={{headerShown:true,headerTitle:'Manage Profile',headerBackTitle:" "}} />
      <Stack.Screen name="address" component={Address} options={{headerShown:true,headerTitle:'Address Details',headerBackTitle:" "}} />
      <Stack.Screen name="payment" component={PaymentDetails} options={{headerShown:true,headerTitle:'Payment Details',headerBackTitle:" "}} />
      <Stack.Screen name="car_profile" component={CarProfile} options={{
        headerBackTitle:' '
      }} />
      <Stack.Screen name="bottom" component={MyBottomSheet} />
      <Stack.Screen name="photo" component={PhotoGallery} options={{headerTitle:'Photos'}} />
      <Stack.Screen name="ss" component={SearchScreen} options={{
        // headerBackTitle:' ',
        // headerBackTitleVisible:false,
        // headerBackImage:()=> null,
        // headerLeft: () => null, 
        headerShown:false
      }} />
    </Stack.Navigator>
  )
}

