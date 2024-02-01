import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View,ActivityIndicator ,Alert, Platform,Linking} from 'react-native'
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
import notifee ,{AndroidImportance,AuthorizationStatus,IOSNotificationSetting,IOSNotificationPermissions,}from '@notifee/react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';


import { LogBox } from 'react-native';
// import PushNotification from 'react-native-push-notification';
import { getToken, notificationListener, requestUserPermission } from './Components/ReuseableComponents/NotificationListener'

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
function App() {
  const [AppLink,setAppLink] = useState('');
  useEffect(() => {
      const unsubscribe = messaging().onMessage(async remoteMessage => {
       
        console.log("notification =>",remoteMessage);
        displayNotification(remoteMessage.notification);
      });
      return unsubscribe;


  }, []);

   const   buildLink =async ()=> {
    const link = await dynamicLinks().buildLink({
      link: 'https://www.unificars.com/',
      // domainUriPrefix is created in your Firebase console
      domainUriPrefix: 'https://unificarsliveauction.page.link',
      // optional setup which updates Firebase analytics campaign
      // "banner". This also needs setting up before hand
      analytics: {
        campaign: 'banner',
      },
    });
  
    console.log("link =>",link);
  }

  const displayNotification = async(rm)=>{
    if(Platform.OS == "ios"){
      await notifee.requestPermission( )
    }
    const channelId = await notifee.createChannel({
      id: 'custom_sound_5',
      name: 'Custom Channel 5',
      sound: 'notificationsound', // Specify your custom sound file name
      importance:AndroidImportance.HIGH
    });
    
    // Display a notification
    await notifee.displayNotification({
      title: rm.title,
      body: rm.body,
      ios:{
        critical: true,
        sound: 'notificationsound.wav',
      },
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  }


  useEffect(() => {
    buildLink();
    requestUserPermission();
    notificationListener();
    getToken();
  }, []);

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
    <NavigationContainer >
      {boolstate ? 
      <MainNavigation />
        : <AuthStack />}
    </NavigationContainer>
  );
}

export default App;
