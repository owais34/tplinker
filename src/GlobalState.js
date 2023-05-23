import React, { useReducer } from "react";

const GlobalStateContext = React.createContext();

const initialState = {
  items: [],
  total: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + action.payload.price,
      };
    case "REMOVE_ITEM":
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        items: updatedItems,
        total: state.total - action.payload.price,
      };
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
}

function GlobalStateProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GlobalStateContext.Provider>
  );
}

export { GlobalStateProvider, GlobalStateContext };
