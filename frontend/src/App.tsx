import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/client/Homepage";
import Signin from "./pages/client/Signin";
import Register from "./pages/client/Register";
import PropertyPage from "./pages/client/Property/Property";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/property" element={<PropertyPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
