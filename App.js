import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View,ActivityIndicator ,Alert, Platform} from 'react-native'
import globalStyles from './Styles/global'
import TabRoutes from './Components/Navigations/TabRoutes'
import { NavigationContainer } from '@react-navigation/native'
import StackRoutes from './Components/Navigations/StackRoutes'
import MainNavigation from './Components/Navigations/MainNavigation'
import AuthStack from './Components/Navigations/AuthStack'
import { useNavigation } from '@react-navigation/native'
import { PhotoGallery } from './export'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './Redux/Store/configureStore'
import { toggleBoolean } from './Redux/Actions/booleanActions'
import { initializeBooleanState } from './Redux/Actions/booleanActions'
import messaging from '@react-native-firebase/messaging';
import { LogBox } from 'react-native';
import PushNotificationIOS from 'react-native-push-notification';
import { getToken, notificationListener, requestUserPermission } from './Components/ReuseableComponents/NotificationListener'
import { platform } from 'os'
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
function App() {
  const [toggle, settoggle] = useState(true);
  // console.log("platform => ",Platform.OS)
  useEffect(() => {
    if(Platform.OS === 'android'){
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        configureCustomNotificationSound(remoteMessage);
      });
      return unsubscribe;
    }
   
  }, []);

  const configureCustomNotificationSound = (rm) => {
    // Configure notification channel for Android (optional)
    PushNotification.createChannel(
      {
        channelId: 'custom_channel',
        channelName: 'Custom Channel',
        channelDescription: 'A channel with a custom sound',
        soundName: 'notificationsound.mp3', // Specify your custom sound file name
      },
      (created) => console.log(`CreateChannel returned '${created}'`)
    );
  
    // Create and display a notification (if needed)
    PushNotification.localNotification({
      channelId: 'custom_channel', // Use the channel you created for Android
      title: rm.notification.title,
      message: rm.notification.body,
    });
  };

  useEffect(() => {
    if(Platform.OS === 'android'){
      requestUserPermission();
      notificationListener();
      getToken();
    }
    
  }, [])
  
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

const Main = () => {
  const dispatch = useDispatch();
  const boolstate = useSelector((state) => state.booleanState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch and set the boolean state when the app starts
    dispatch(initializeBooleanState())
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.error('Error initializing boolean state:', error);
        setIsLoading(false);
      });
  }, []);

  // While loading, show a loading indicator
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  

  // After loading, conditionally render the AuthStack or MainNavigation
  return (
    <NavigationContainer>
      {boolstate ? 
      <MainNavigation />
        : <AuthStack />}
    </NavigationContainer>
  );
}

export default App;
