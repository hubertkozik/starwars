import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";
import SearchPage from "./components/SearchPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={CharacterList} exact />
        <Route path="/search/:searchValue" component={SearchPage} />
      </Switch>
    </Router>
  );
}

export default App;
