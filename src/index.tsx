import * as React from "react";
import * as ReactDOM from "react-dom";
import "./assets/sass/app.scss";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { RandomContextProvider } from "./context/RandomContext";
import { CookiesProvider } from "react-cookie";
// for connecting user and authIsReady propaties from all components

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RandomContextProvider>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </RandomContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
