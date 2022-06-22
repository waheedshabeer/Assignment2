import InitialState from './InitialStates';
const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case 'setParkingLotsLeft':
      return {
        ...state,
        parkingLotsLeft: action.payLoad,
      };
    case 'setParkingLotsRight':
      return {
        ...state,
        parkingLotsRight: action.payLoad,
      };
    default:
      return state;
  }
};

export default reducer;
