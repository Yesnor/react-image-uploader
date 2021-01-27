import "./App.css";
import { useReducer } from "react";
import { initialState, context, reducer } from "./context";
import UploadForm from "./UploadForm";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <context.Provider value={{ dispatch, state }}>
      <UploadForm />
    </context.Provider>
  );
}

export default App;
