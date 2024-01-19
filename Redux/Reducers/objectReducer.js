// objectReducer.js
const initialState = {
  change: '',
  model: [],
  type: '',
  transmission: '',
  km: '',
  regisCity: '',
  year: '',
  owner: '',
  user_id: '',
}; // Initial state

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
