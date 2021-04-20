import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={CharacterList} exact />
      </Switch>
    </Router>
  );
}

export default App;
