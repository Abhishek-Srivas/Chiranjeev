import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/Landing-Page/LandingPage";


function App() {
  return (
    <BrowserRouter>
      <Switch>
      
        <Route path="*" component={LandingPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
