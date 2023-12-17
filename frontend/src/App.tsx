import React from "react";
import PropertyList from "./components/Property/PropertyList";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <PropertyList />
    </Provider>
  );
}

export default App;
