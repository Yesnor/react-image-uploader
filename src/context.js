import React from "react";

export const context = React.createContext();
export const initialState = {
  files: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "add_files":
      return {
        files: [...state.files, action.payload],
      };
    default:
      return state;
  }
};
