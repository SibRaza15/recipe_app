import React from "react";
import Recipe from "./views/Recipe/Recipe";
import { Route, Switch } from "react-router-dom";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import Auth from "../hoc/auth";
import NavBar from "./views/Navbar/Navbar";
import FavoritePage from "./views/Favorites/FavoritePage";

import "./App.css";

export default function App() {
  return (
    <div>
      <NavBar />
      <div style={{ paddingTop: "69px" }}></div>
      <Switch>
        <Route path="/recipe" component={Auth(Recipe, true)} />
        <Route exact path="/login" component={Auth(Login, false)} />
        <Route exact path="/register" component={Auth(Register, false)} />
        <Route exact path="/favorite" component={Auth(FavoritePage, true)} />
      </Switch>
    </div>
  );
}
