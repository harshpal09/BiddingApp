import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Procured,RcTransfer ,Nagotiation } from '../../export';
import HeaderSearch from '../ReuseableComponents/HeaderSearch';

import { BLUE_COLOR, INACTIVE_TINT_COLOR, LIGHT_BLUE, MEDIUM_FONT_SIZE, ORANGE_COLOR, SMALL_FONT_SIZE, TOP_TAB_COLOR, TOP_TAB_TEXT_COLOR } from '../../Styles/global';


const HeaderTab = createMaterialTopTabNavigator();

export default function ProcuredTopnavigation({navigation}) {

  
 
  return (
    <SafeAreaView style={{flex:1}}>
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
            fontSize: SMALL_FONT_SIZE,
            fontWeight:'700',
            color:TOP_TAB_TEXT_COLOR

          },
          // tabBarActiveTintColor:'black',
          tabBarIndicatorContainerStyle: {
            // backgroundColor:'green',
            // width:'100%'
            
          },
        //tabBarIndicator: e => console.log(e),
        }}>
        <HeaderTab.Screen name="Negotiation" component={Nagotiation} options={{tabBarLabel:'IN NEGOTIATION'}} />
        <HeaderTab.Screen name="procured" component={Procured} />  
        <HeaderTab.Screen name="rctransfer" component={RcTransfer} />
  
      </HeaderTab.Navigator>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
