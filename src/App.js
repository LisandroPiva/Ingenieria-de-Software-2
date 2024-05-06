import LogIn from "./components/LogIn";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Form from "./components/Form";
import Config from "./components/Config";
import Post from "./components/Post";
import AdminView from "./components/AdminView"; // Corrige la ruta de importación de AdminView

import { Route, Switch } from "wouter";

function App() {
  return (
    <Switch>
      <Route path="/" component={LogIn} />
      <Route path="/SignUp" component={SignUp} />
      <Route path="/SignIn" component={SignIn} />
      <Route path="/Login" component={LogIn}/>
      <Route path="/Config" component={Config}/>
      <Route path="/Form" component={Form}/>
      <Route path="/Post" component={Post}/>
      <Route path="/AdminView" component={AdminView}/>
    </Switch>
  );
}

export default App;
