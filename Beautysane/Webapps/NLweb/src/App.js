import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "./assets/css/feather.css"
import "./assets/css/materialdesignicons.css"
import "./assets/css/dripiIcons.css"
import "./assets/css/fa.css"
import "./assets/css/fonts.css"
import './assets/scss/DefaultTheme.scss';
import './App.css'
import 'semantic-ui-css/semantic.min.css'










import firebase from "firebase/app";

import listeRecette from "./pages/listRecette/listeRecette";
import recette from "./pages/listRecette/recette";
import questions from "./pages/questions/questions";
import addRecette from "./pages/addRecette/addRecette";
import  recetteID from "./pages/listRecette/recetteID";
import  dashboard from "./pages/Dashboard/dashboard";
import bondyQuestions from "./pages/bondyQuestions/questions"
import  authentification from "./pages/auth/authentification";
import  authentificationTo from "./pages/auth/authentificationTo";








const firebaseConfig =  {
    apiKey: "AIzaSyADBksHxor-OBDNMwhLs8Z2-dikj8YTvTM",
    authDomain: "beautysane-61cf2.firebaseapp.com",
    databaseURL: "https://beautysane-61cf2.firebaseio.com",
    projectId: "beautysane-61cf2",
    storageBucket: "beautysane-61cf2.appspot.com",
    messagingSenderId: "716549886066",
    appId: "1:716549886066:web:cd3089ae9c371d3245f2eb",
    measurementId: "G-MM0W4MPEX2"
};



firebase.initializeApp(firebaseConfig);

class App extends Component{


  componentWillMount() {

  }


    render() {

    return(
        <Router>



            <Route exact path="/" component={listeRecette}/>
            <Route exact path="/questions" component={questions}/>
            <Route exact path="/bondyquestions" component={bondyQuestions}/>
            <Route exact path="/addRecette" component={addRecette}/>
            <Route exact path="/recettes/:id" component={recette}/>
            <Route exact path="/recette/:id" component={recetteID}/>
            <Route exact path="/dashboard/:id" component={dashboard}/>


            <Route exact path="/login" component={authentification}/>
            <Route exact path="/login/:to" component={authentificationTo}/>

















            {/*<Route exact path="/login" name="login" component={Login}/>
          <Route exact path="/logout" name="logout" component={Logout}/>*/}

        </Router>
    )
  }

}

export default App;




