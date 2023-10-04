// arrayActions.js
export const addToArray = (item) => ({
    type: 'ADD_TO_ARRAY',
    payload: item,
  });
  
  export const removeFromArray = (item) => ({
    type: 'REMOVE_FROM_ARRAY',
    payload: item,
  });
  