import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { LOGIN, EVENT_CALENDAR, EVENT_CREATE } from '../../dist/routes';
import Authentication from '../../helpers/auth';

export default class MainPage extends Component{
    state = {
        loggedIn : false
    };

    componentDidMount(){
        let loggedIn = (new Authentication).isUserLoggedIn();

        this.setState({loggedIn});
    }

    render(){
        return (
            <section className="home_banner_area">
                <div className="banner_inner">
                    <div className="container">
                        <div className="banner_content">
                        <h2>EVENT MANAGEMENT APP</h2>
                        <p>Manage your events seamlesly</p>
                        <Link className="banner_btn" to={this.state.loggedIn ? EVENT_CALENDAR : LOGIN}>VIEW EVENTS</Link>
                        <Link className="banner_btn" to={this.state.loggedIn ? EVENT_CREATE : LOGIN}>CREATE EVENT</Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}