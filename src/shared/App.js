import React from "react"
import Header from  "../components/Header"
import Main from  "../pages/Main"
import Login from  "../pages/Login"
import Signup from  "../pages/Signup"
import Userpage from  "../pages/Userpage"
import PerformInfo from "../pages/PerformInfo"

import NotFound from  "../pages/NotFound"
import {Switch, Route, BrowserRouter} from "react-router-dom"
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import styled from 'styled-components'
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

function App() {

  const dispatch = useDispatch();
  const is_session = sessionStorage.getItem('JWT') ? true : false;

  React.useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheck());
    }
  }, []);

  return (
    <AppContainer>
      <ConnectedRouter history={history}>
      <Header/>
        <Switch>
          <Route path="/" exact component={Main}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/signup" exact component={Signup}/> 
          <Route path="/userpage/:id" exact component={Userpage}/>  
          <Route path="/performance" exact component={PerformInfo}/>
          <Route exact component={NotFound}/>
        </Switch>
      </ConnectedRouter>
    </AppContainer>
  )
}

const AppContainer = styled.div`
  margin-bottom: 60px;
`

export default App;
