import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "./pages/Main";
import Form from "./pages/Form";
import Edit from "./pages/Edit";
import List from "./pages/List";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/form" component={Form} />
      <Route exact path="/edit/:id" component={Edit} />
      <Route exact path="/list" component={List} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
