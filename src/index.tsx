import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.scss";
import "./assets/sass/app.scss";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
// for connecting user and authIsReady propaties from all components

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
