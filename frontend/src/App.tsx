import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import AgentCard from "./components/Agent/AgentCard";

function App() {
  return (
    <Provider store={store}>
      <AgentCard
        agentId="6b23fb9c-22a2-461b-af72-c72a7a67b21d"
        photo="https://images.unsplash.com/photo-1560250097-0b93528c311a"
      />
    </Provider>
  );
}

export default App;
