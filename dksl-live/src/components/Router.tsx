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
import League from "../routes/League";
import Records from "../routes/Records";
import Header from "./Header";

export default () => (
  <>
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/league" component={League} />
        <Route path="/live/:id" component={Main} />
        <Route path="/records" component={Records} />
        <Route path="/stat/:id" component={Stat} />
        <Route exact path="/search" component={Search} />
        <Route path="/404" component={NotFound} />
        <Redirect path="*" to="/404" />
      </Switch>
    </Router>
  </>
);
