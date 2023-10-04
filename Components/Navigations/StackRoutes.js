// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack'; // Import transition presets


import MyCars from '../TabScreens/MyCars';
import HomeScreen from '../TabScreens/HomeScreen';
import CarProfile from '../StackScreens/CarProfile';
// import TabRoutes from './TabRoutes';
// import TabRoutes from './TabRoutes';
 // Make sure this import is correct

//  const Stack = createNativeStackNavigator();
 const Stack = createStackNavigator();

export default function StackRoutes () {
  return (
    <Stack.Navigator 
    initialRouteName='tab'
    screenOptions={{
      ...TransitionPresets.SlideFromRightIOS, // Use slide transition
    }}
    >
      {/* <Stack.Screen name="tab" component={TabRoutes} options={{headerShown:false}} /> */}
      <Stack.Screen name='home' component={HomeScreen} options={{headerShown:false}} />
      {/* <Stack.Screen name="car_profile" component={CarProfile} options={{headerShown:false}} /> */}
    </Stack.Navigator>
  );
};
