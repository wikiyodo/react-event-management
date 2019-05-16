import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MainPage from "../features/main";
import { HOME, LOGIN, REGISTRATION, EVENT_CALENDAR, EVENT_CREATE, LOGOUT } from "../dist/routes";
import LoginPage from "../features/auth/login";
import RegistrationPage from "../features/auth/register";
import EventCalendar from "../features/event/calendar";
import EventCreate from "../features/event/create";
import Authentication from "../helpers/auth";
import Header from "../layouts/header";

class AppContainer extends Component{
    
    state = {
        loggedIn: false
    };

    componentDidMount(){
        this.checkLoginStatus();
    }

    checkLoginStatus = () => {
        let loggedIn = (new Authentication).isUserLoggedIn();

        this.setState({loggedIn});
    };

    logoutAction = () => {
        (new Authentication).removeApiKey();
        this.checkLoginStatus();
        return (
            <Redirect to={{
                pathname:HOME,
            }} />
        );
    };

    render(){
        return(
            <div className="app__root">
                <Header loggedIn={this.state.loggedIn} />
                <Switch>
                    <Route
                        path={HOME}
                        exact
                        render={()=><MainPage />} />
                    <Route
                        path={LOGIN}
                        exact
                        render={()=><LoginPage onLogin={this.checkLoginStatus} />} />
                    <Route
                        path={LOGOUT}
                        exact
                        render={this.logoutAction} />
                    <Route
                        path={REGISTRATION}
                        exact
                        render={()=><RegistrationPage />} />
                    <Route
                        path={EVENT_CALENDAR}
                        exact
                        render={()=><EventCalendar />} />
                    <Route
                        path={EVENT_CREATE}
                        exact
                        render={()=><EventCreate />} />
                </Switch>
            </div>
        )
    }
}

export default AppContainer;
