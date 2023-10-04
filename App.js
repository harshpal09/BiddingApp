import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View,ActivityIndicator } from 'react-native'
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
// import store from './Redux/Store/configureStore'; 
function App() {
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
