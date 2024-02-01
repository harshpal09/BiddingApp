import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { BLUE_COLOR, INACTIVE_TINT_COLOR, LIGHT_BLUE, ORANGE_COLOR, SMALL_FONT_SIZE } from '../../Styles/global';
import { Damage, Interior, Exterior, Others } from '../../export';
import { useRoute } from '@react-navigation/native';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

const HeaderTab = createMaterialTopTabNavigator();
export default function PhotoGallery() {

  const route = useRoute();
  const { screen, id, length,item} = route.params;





  // console.log('id  => ', id, ' length => ', length);
  return (
    <SafeAreaView style={{ height: '100%', }}>
      <HeaderTab.Navigator
        initialRouteName='Exterior'
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: ORANGE_COLOR,
          },
          tabBarActiveTintColor: ORANGE_COLOR,
          tabBarInactiveTintColor: INACTIVE_TINT_COLOR,
          tabBarLabelStyle: {
            fontSize: SMALL_FONT_SIZE,
            fontWeight: '700'
          },

        }}>
        {
        length == 1 ?
          <>
            <HeaderTab.Screen name="exterior" component={Exterior} initialParams={{ id: id ,item:item}} />
          </>
          :

          length== 2 ?
            <>
              <HeaderTab.Screen name="exterior" component={Exterior} initialParams={{ id: id ,item : item}} />
              <HeaderTab.Screen name="interior" component={Interior} initialParams={{ id: id ,item:item}} />
            </> :
            length == 3 ?
              <>
                <HeaderTab.Screen name="interior" component={Interior} initialParams={{ id: id ,item:item}} />
                <HeaderTab.Screen name="exterior" component={Exterior} initialParams={{ id: id ,item:item}} />
                <HeaderTab.Screen name="damage" component={Damage} initialParams={{ id: id ,item:item}} />
              </> :
              // length == 4 ?
              //   <>
              //     <HeaderTab.Screen name="interior" component={Interior} initialParams={{ id: id,item:item }} />
              //     <HeaderTab.Screen name="exterior" component={Exterior} initialParams={{ id: id,item:item }} />
              //     <HeaderTab.Screen name="others" component={Others} initialParams={{ id: id ,item:item}} />
              //     <HeaderTab.Screen name="damage" component={Damage} initialParams={{ id: id ,item:item}} />
              //   </> :
                <></>
        }
        {/* <HeaderTab.Screen name="exterior" component={Exterior}  initialParams={{ id: id }} /> */}



      </HeaderTab.Navigator>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})




