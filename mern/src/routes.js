import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainPage from './pages/AuthPage/mainPAge/MainPage';
import AuthPage from './pages/AuthPage/AuthPage';

export const useRoutes = (isLogin) => {
    if(isLogin){
        return(
            <Switch>
                <Route path="/" component={MainPage} />
                <Redirect to="/" />
            </Switch>
        )
    }
    return(
        <Switch>
            <Route path="/login" component={AuthPage} />
            <Redirect to="/login" />
        </Switch>
    )
}