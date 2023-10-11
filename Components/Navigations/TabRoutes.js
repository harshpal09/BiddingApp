import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MyCars,Profile,TopNavigation,Orders, ProcuredTopnavigation} from '../../export';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { BLUE_COLOR, INACTIVE_TINT_COLOR, LIGHT_BLUE,ORANGE_COLOR } from '../../Styles/global';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor:ORANGE_COLOR,tabBarInactiveTintColor:INACTIVE_TINT_COLOR}}>
      <Tab.Screen
        name="Home"
        component={TopNavigation}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="home" color={color} size={size} />
          ),
          
        }}
      />
      <Tab.Screen
       name="My Cars" 
       component={MyCars} 
       options={{
        headerShown: false,
        tabBarLabel: 'My Cars',
        tabBarIcon: ({color, size}) => (
          <FontAwesome5 name="car" color={color} size={size} />
        ),
      }}
       />
      <Tab.Screen 
      name="Orders" 
      component={ProcuredTopnavigation} 
      options={{
        headerShown: false,
        tabBarLabel: 'Procured',
        tabBarIcon: ({color, size}) => (
          <FontAwesome5 name="shopping-bag" color={color} size={size} />
        ),
      }}
      />
      <Tab.Screen 
      name="Profile" 
      component={Profile}
      options={{
        headerShown: false,
        tabBarLabel: 'Profile',
        tabBarIcon: ({color, size}) => (
          <FontAwesome5 name="user-alt" color={color} size={size} />
        ),
      }} 
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
