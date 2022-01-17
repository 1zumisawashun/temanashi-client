import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Dashboard from "./pages/dashboard/Dashboard";
import CreateFurniture from "./pages/create/CreateFurniture";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Furniture from "./pages/furniture/Furniture";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import OnlineUsers from "./components/OnlineUsers";
import Diagnose from "./pages/diagnose/Diagnose";
import UserFavorite from "./pages/user/UserFavorite";
import UserAccount from "./pages/user/UserAccount";
import UserHistory from "./pages/user/UserHistory";
import Cart from "./pages/cart/Cart";
import DiagnoseResult from "./pages/diagnose/DiagnoseResult";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";

const App = () => {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className="App">
      {/* 一度もログインしたことのないユーザー */}
      {!authIsReady && (
        <BrowserRouter>
          <div className="container -auth">
            <Switch>
              <Route exact path="/">
                {!user && !authIsReady && <Redirect to="/login" />}
              </Route>
              <Route path="/login">
                {user && <Redirect to="/login" />}
                {!user && <Login />}
              </Route>
              <Route path="/signup">
                {user && <Redirect to="/login" />}
                {!user && <Signup />}
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      )}

      {/* アクティブユーザーがログアウトした時 */}
      {authIsReady && !user && (
        <BrowserRouter>
          <div className="container -auth">
            <Switch>
              <Route exact path="/">
                {!user && <Redirect to="/login" />}
              </Route>
              <Route path="/login">
                {user && <Redirect to="/login" />}
                {!user && <Login />}
              </Route>
              <Route path="/signup">
                {user && <Redirect to="/login" />}
                {!user && <Signup />}
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      )}

      {/* アクティブユーザー */}
      {authIsReady && user && (
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
              <Route path="/create/furniture">
                {!user && <Redirect to="/login" />}
                {user && <CreateFurniture />}
              </Route>
              <Route path="/furnitures/:id">
                {!user && <Redirect to="/login" />}
                {user && <Furniture />}
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
              <Route path="/users/:id/cart">
                {!user && <Redirect to="/login" />}
                {user && <Cart />}
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
      )}
    </div>
  );
};

export default App;
