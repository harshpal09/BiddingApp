/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';



  

AppRegistry.registerComponent(appName, () => App);
