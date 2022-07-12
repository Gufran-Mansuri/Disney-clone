import "./App.css";
import Login from "./components/Login";
import Header from "./components/Header";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Details from "./components/Details";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/home" component={Home}/>
          <Route exact path="/details/:id" >
            <Details />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
