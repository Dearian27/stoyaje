import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store } from "/src/redux/store";
import { Provider } from "react-redux";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
