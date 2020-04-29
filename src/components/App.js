import React from 'react'
import Recipe from './views/Recipe/Recipe'
import { Route, Switch } from 'react-router-dom'
import Register from './views/Register/Register'
import Login from './views/Login/Login'
import Auth from '../hoc/auth';

import './App.css'


export default function App(){

  return(
    <div>
      <Switch>
        <Route path ="/recipe" component ={Auth(Recipe,true)} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
    </Switch>
    </div>
  )
}