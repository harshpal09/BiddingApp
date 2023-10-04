// booleanActions.js
export const toggleBoolean = (item) => ({
    type: 'TOGGLE_BOOLEAN',
    payload: item,
  });


  // booleanActions.js
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define an action type for initializing the boolean state
const INIT_BOOLEAN_STATE = 'INIT_BOOLEAN_STATE';

// Action creator to initialize the boolean state from AsyncStorage
export const initializeBooleanState = () => {
  return async (dispatch) => {
    try {
      // Fetch the login status from AsyncStorage
      const isLoggedIn = await AsyncStorage.getItem('user_id') !== null;
      
      // Dispatch the INIT_BOOLEAN_STATE action with the fetched value
      dispatch({
        type: INIT_BOOLEAN_STATE,
        payload: isLoggedIn,
      });
    } catch (error) {
      console.error('Error initializing boolean state:', error);
    }
  };
};

  