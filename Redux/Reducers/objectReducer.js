// objectReducer.js
const initialState = {}; // Initial state

const objectReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_OBJECT':
      return {
        ...state,
        ...action.payload, // Merge new values into the object
      };
    default:
      return state;
  }
};

export default objectReducer;
