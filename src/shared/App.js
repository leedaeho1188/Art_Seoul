import React from "react"
import Header from  "../components/Header"
import Main from  "../pages/Main"
import Login from  "../pages/Login"
import Signup from  "../pages/Signup"
import PostWrite from "../pages/PostWrite"
import NotFound from  "../pages/NotFound"
import {Switch, Route, BrowserRouter} from "react-router-dom"
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";


function App() {
  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
      <Header/>
        <Switch>
          <Route path="/" exact component={Main}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/signup" exact component={Signup}/>
          <Route path="/write/:id" exact component={PostWrite} />
          <Route exact component={NotFound}/>
        </Switch>
      </ConnectedRouter>
    </React.Fragment>
  )
}

export default App;
