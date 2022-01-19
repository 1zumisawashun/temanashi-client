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
import Complete from "./pages/cart/Complete";
import DiagnoseResult from "./pages/diagnose/DiagnoseResult";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";
import Error from "./pages/error";

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
          <Route path="/error">
            <Error />
          </Route>
          <Route path="/terms">
            <Terms />
          </Route>
          <Route path="/privacy">
            <Privacy />
          </Route>
          <Route path="/complete">
            <Complete />
          </Route>
          <Switch>
            <Route exact path="/">
              {user && <Sidebar />}
              <div className="container">
                <Navbar />
                {!user && <Redirect to="/login" />}
                {user && <Dashboard />}
              </div>
              {user && <OnlineUsers />}
            </Route>
            <Route exact path="/diagnose">
              {user && <Sidebar />}
              <div className="container">
                <Navbar />
                {!user && <Redirect to="/login" />}
                {user && <Diagnose />}
              </div>
              {user && <OnlineUsers />}
            </Route>
            <Route path="/diagnose/result">
              {user && <Sidebar />}
              <div className="container">
                <Navbar />
                {!user && <Redirect to="/login" />}
                {user && <DiagnoseResult />}
              </div>
              {user && <OnlineUsers />}
            </Route>
            <Route path="/create/furniture">
              {user && <Sidebar />}
              <div className="container">
                <Navbar />
                {!user && <Redirect to="/login" />}
                {user && <CreateFurniture />}
              </div>
              {user && <OnlineUsers />}
            </Route>
            <Route path="/furnitures/:id">
              {user && <Sidebar />}
              <div className="container">
                <Navbar />
                {!user && <Redirect to="/login" />}
                {user && <Furniture />}
              </div>
              {user && <OnlineUsers />}
            </Route>
            <Route path="/login">
              {user && <Sidebar />}
              <div className="container">
                <Navbar />
                {user && <Redirect to="/" />}
                {!user && <Login />}
              </div>
              {user && <OnlineUsers />}
            </Route>
            <Route path="/signup">
              {user && <Sidebar />}
              <div className="container">
                <Navbar />
                {user && <Redirect to="/" />}
                {!user && <Signup />}
              </div>
              {user && <OnlineUsers />}
            </Route>
            <Route path="/users/:id/history">
              {user && <Sidebar />}
              <div className="container">
                <Navbar />
                {!user && <Redirect to="/login" />}
                {user && <UserHistory />}
              </div>
              {user && <OnlineUsers />}
            </Route>
            <Route path="/users/:id/account">
              {user && <Sidebar />}
              <div className="container">
                <Navbar />
                {!user && <Redirect to="/login" />}
                {user && <UserAccount />}
              </div>
              {user && <OnlineUsers />}
            </Route>
            <Route path="/users/:id/favorite">
              {user && <Sidebar />}
              <div className="container">
                <Navbar />
                {!user && <Redirect to="/login" />}
                {user && <UserFavorite />}
              </div>
              {user && <OnlineUsers />}
            </Route>
            <Route path="/users/:id/cart">
              {user && <Sidebar />}
              <div className="container">
                <Navbar />
                {!user && <Redirect to="/login" />}
                {user && <Cart />}
              </div>
              {user && <OnlineUsers />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
