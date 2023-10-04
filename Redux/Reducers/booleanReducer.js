// booleanReducer.js

// const initialState = true; // Initial state

// const booleanReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'TOGGLE_BOOLEAN':
//       return action.payload; // Update state based on payload
//     default:
//       return state;
//   }
// };

// export default booleanReducer;


// booleanReducer.js
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define an action type for initializing the boolean state
const INIT_BOOLEAN_STATE = 'INIT_BOOLEAN_STATE';

const initialState = false; // Default initial state

const booleanReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_BOOLEAN':
      return action.payload; // Update state based on payload
    case INIT_BOOLEAN_STATE:
      return action.payload; // Initialize state from AsyncStorage
    default:
      return state;
  }
};

export default booleanReducer;
