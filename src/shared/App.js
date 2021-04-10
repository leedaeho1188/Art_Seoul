import React from "react"
import Header from  "../components/Header"
import Main from  "../pages/Main"
import Login from  "../pages/Login"
import NotFound from  "../pages/NotFound"
import {Switch, Route, BrowserRouter} from "react-router-dom"




function App() {
  return (
    <React.Fragment>
     <BrowserRouter>
     <Header/>
        <Switch>
          <Route path="/" exact component={Main}/>
          <Route path="/login" exact component={Login}/>
          <Route exact component={NotFound}/>
        </Switch>
    </BrowserRouter>
    </React.Fragment>
  )
}

export default App;
