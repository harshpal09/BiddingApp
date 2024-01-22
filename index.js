/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee ,{AndroidImportance}from '@notifee/react-native';
import App from './App';
import {name as appName} from './app.json';


// if(Platform.OS === 'android'){
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
        displayNotification(remoteMessage.notification);
      });
    //   const configureCustomNotificationSound = (rm) => {

    //     // Configure notification channel for Android (optional)
    //     PushNotification.createChannel(
    //       {
    //         channelId: 'custom_channel',
    //         channelName: 'Custom Channel',
    //         channelDescription: 'A channel with a custom sound',
    //         soundName: 'notificationsound.mp3', // Specify your custom sound file name
    //       },
    //       (created) => console.log(`CreateChannel returned '${created}'`)
    //     );
    //     //   console.log(rm.notification.title,"body =>",rm.notification.body);
    //     // Create and display a notification (if needed)
    //     PushNotification.localNotification({
    //       channelId: 'custom_channel', // Use the channel you created for Android
    //       title: rm.notification.title,
    //       message: rm.notification.body,
    //     });
    //   };
    const displayNotification = async(rm)=>{
        await notifee.requestPermission()
    
        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
          id: 'custom_sound_6',
          name: 'Custom Channel 6',
          sound: 'notificationsound', // Specify your custom sound file name
          importance:AndroidImportance.HIGH
        });

    
        // Display a notification
        await notifee.displayNotification({
          title: rm.title,
          body: rm.body,
          ios:{
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
// }

  

AppRegistry.registerComponent(appName, () => App);
