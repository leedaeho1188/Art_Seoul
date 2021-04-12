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

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import {actionCreators as markerActions} from '../redux/modules/marker';


function App() {

  const dispatch = useDispatch();
  const is_session = sessionStorage.getItem('JWT') ? true : false;

  React.useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckSV());
    }
  }, []);

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
