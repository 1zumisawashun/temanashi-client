import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import "./App.scss";
import Dashboard from "./pages/dashboard/Dashboard";
import Create from "./pages/create/Create";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Project from "./pages/project/Project";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import OnlineUsers from "./components/OnlineUsers";
import Diagnose from "./pages/diagnose/Diagnose";
import UserFavorite from "./pages/user/UserFavorite";
import UserAccount from "./pages/user/UserAccount";
import UserHistory from "./pages/user/UserHistory";
import DiagnoseResult from "./pages/diagnose/DiagnoseResult";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";

const App = () => {
  // const { user, authIsReady } = useAuthContext();
  const { user } = useAuthContext();
  return (
    <div className="App">
      {/* {authIsReady && ( */}
      <BrowserRouter>
        {user && <Sidebar />}
        <div className="container">
          <Navbar />
          <Switch>
            <Route exact path="/">
              {!user && <Redirect to="/login" />}
              {user && <Dashboard />}
            </Route>
            <Route exact path="/diagnose">
              {!user && <Redirect to="/login" />}
              {user && <Diagnose />}
            </Route>
            <Route path="/diagnose/result">
              {!user && <Redirect to="/login" />}
              {user && <DiagnoseResult />}
            </Route>
            <Route path="/create">
              {!user && <Redirect to="/login" />}
              {user && <Create />}
            </Route>
            <Route path="/projects/:id">
              {!user && <Redirect to="/login" />}
              {user && <Project />}
            </Route>
            <Route path="/login">
              {user && <Redirect to="/" />}
              {!user && <Login />}
            </Route>
            <Route path="/signup">
              {user && <Redirect to="/" />}
              {!user && <Signup />}
            </Route>
            <Route path="/users/:id/history">
              {!user && <Redirect to="/login" />}
              {user && <UserHistory />}
            </Route>
            <Route path="/users/:id/account">
              {!user && <Redirect to="/login" />}
              {user && <UserAccount />}
            </Route>
            <Route path="/users/:id/favorite">
              {!user && <Redirect to="/login" />}
              {user && <UserFavorite />}
            </Route>
            <Route path="/terms">
              <Terms />
            </Route>
            <Route path="/privacy">
              <Privacy />
            </Route>
          </Switch>
        </div>
        {user && <OnlineUsers />}
      </BrowserRouter>
      {/* )} */}
    </div>
  );
};

export default App;
