import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { NavBar, Footer, Loading } from "./components";
import { Home, Profile, CreateTopic } from "./views";
import ProtectedRoute from "./auth/protected-route";
import bc from '../src/utils/broadCastChannel'; 

import "./app.css";

const App = () => {

  window.title= "Conduktor FE Task";
  
  const { isLoading, logout } = useAuth0();
  
  bc.onmessage = (ev) => {
    if(ev.message == 'logout'){
      // handling lougout using auth0 
      logout({
        returnTo: window.location.origin,
      })
    }

    // so on 

  }; 


  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <div className="container flex-grow-1">
        <Switch>
          <Route path="/" exact component={Home} />
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/topics-create" component={CreateTopic}/>
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
