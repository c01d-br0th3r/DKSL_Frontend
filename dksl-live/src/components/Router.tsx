import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Main from "../routes/Main";
import NotFound from "../routes/NotFound";

export default () => (
  <>
    <Router>
      <Switch>
        <Route path="/live/:id" component={Main} />
        <Route path="/404" component={NotFound} />
        <Redirect path="*" to="/404" />
      </Switch>
    </Router>
  </>
);