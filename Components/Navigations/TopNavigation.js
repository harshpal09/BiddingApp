import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {HomeScreen, MyAutions, MyPurchases} from '../../export';
import HeaderSearch from '../ReuseableComponents/HeaderSearch';

import { BLUE_COLOR, INACTIVE_TINT_COLOR, LIGHT_BLUE, MEDIUM_FONT_SIZE, ORANGE_COLOR, TOP_TAB_COLOR, TOP_TAB_TEXT_COLOR } from '../../Styles/global';

const HeaderTab = createMaterialTopTabNavigator();

export default function TopNavigation({navigation}) {

  
 
  return (
    <SafeAreaView style={{height: '100%',}}>
      {/* <View> */}
        <HeaderSearch navigation={navigation} />
      {/* </View> */}
      <HeaderTab.Navigator
        style={{
          // padding: 10
        }}
        screenOptions={{
            tabBarIndicatorStyle:{
                backgroundColor:TOP_TAB_TEXT_COLOR,
            },
            tabBarActiveTintColor:ORANGE_COLOR,
            tabBarInactiveTintColor:TOP_TAB_COLOR,
          tabBarStyle: {
            backgroundColor:TOP_TAB_COLOR,
            // padding: 10,
            // width:'100%'
          },
          tabBarLabelStyle: {
            fontSize: MEDIUM_FONT_SIZE,
            fontWeight:'700',
            color:TOP_TAB_TEXT_COLOR

          },
          // tabBarActiveTintColor:'black',
          tabBarIndicatorContainerStyle: {
            // backgroundColor:'green',
            // width:'100%'
            
          },
          

        //   tabBarIndicator: e => console.log(e),
        }}>
        <HeaderTab.Screen name="Live Auction" component={HomeScreen} />
        {/* <HeaderTab.Screen name="OCB" component={MyAutions} /> */}
        {/* <HeaderTab.Screen name="My Purchases" component={MyPurchases} /> */}
      </HeaderTab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
