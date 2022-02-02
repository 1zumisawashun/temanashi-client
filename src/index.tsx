import * as React from "react";
import * as ReactDOM from "react-dom";
import "./assets/sass/app.scss";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { CookiesProvider } from "react-cookie";
// for connecting user and authIsReady propaties from all components

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
