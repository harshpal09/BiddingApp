// arrayReducer.js
const initialState = []; // Initial state

const arrayReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_ARRAY':
      return [...state, action.payload]; // Add an item to the array
    case 'REMOVE_FROM_ARRAY':
      return state.filter((item) => item !== action.payload); // Remove an item from the array
    default:
      return state;
  }
};

export default arrayReducer;
