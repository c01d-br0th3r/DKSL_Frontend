import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "../routes/Home";
import Main from "../routes/Main";
import NotFound from "../routes/NotFound";
import Stat from "../routes/Stat";
import Search from "../routes/Search";
import Header from "./Header";

export default () => (
  <>
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/live/:id" component={Main} />
        <Route path="/stat/:id" component={Stat} />
        <Route exact path="/search" component={Search} />
        <Route path="/404" component={NotFound} />
        <Redirect path="*" to="/404" />
      </Switch>
    </Router>
  </>
);
