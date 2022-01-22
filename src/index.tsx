import * as React from "react";
import * as ReactDOM from "react-dom";
import "./assets/sass/app.scss";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { RandomContextProvider } from "./context/RandomContext";
// for connecting user and authIsReady propaties from all components

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RandomContextProvider>
        <App />
      </RandomContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
