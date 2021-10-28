import React, { useEffect, createContext, useReducer, useContext } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import UserProfile from "./components/pages/UserProfile";
import CreatePost from "./components/pages/CreatePost";
import SinglePost from "./components/pages/SinglePost";
import Register from "./components/pages/OuterPage/Register";
import Login from "./components/pages/OuterPage/Login";
import { reducer, initialState } from "./reducers/userReducer";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    // const user = localStorage.getItem("user");
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(typeof(user))
    if (user) {
      dispatch({ type: "USER", payload: user });
      history.push("/");
    } else {
      history.push("/signin");
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/profile/:userId" component={UserProfile} />
      <Route exact path="/createpost" component={CreatePost} />
      <Route exact path="/signin" component={Login} />
      <Route exact path="/signup" component={Register} />
      <Route exact path="/post/:postId" component={SinglePost} />
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
      
        <div className="App">
          <Navbar />
          <Routing />
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
